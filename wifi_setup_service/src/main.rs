use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
use std::fs;
use std::time::{Duration, Instant};
use std::thread;
use std::fs::File;
use std::io::Write;
use std::process::Command;
use std::env;

#[derive(Deserialize)]
struct WifiForm {
    ssid: String,
    password: String,
}

async fn index() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html")
        .body(r#"
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { cursor: none !important; }
                    * { cursor: none !important; }
                </style>
            </head>
            <body>
                <h1>Set Wi-Fi</h1>
                <form method="POST" action="/set_wifi">
                    <label>SSID: <input type="text" name="ssid"></label><br>
                    <label>Password: <input type="password" name="password"></label><br>
                    <input type="submit" value="Connect">
                </form>
            </body>
            </html>
        "#)
}

async fn set_wifi(form: web::Form<WifiForm>) -> impl Responder {
    let ssid = form.ssid.clone();
    let password = form.password.clone();
    let interface = "wlan0"; // Replace with your actual interface (e.g., wlp2s0) or use dynamic detection

    // Run blocking operations in a separate thread pool
    let result = web::block(move || {
        // Write wpa_supplicant configuration
        let config = format!(
            r#"ctrl_interface=DIR=/var/run/
update_config=1
country=US

network={{
    ssid="{}"
    psk="{}"
}}
"#,
            ssid, password
        );

        let file_path = "/etc/wpa_supplicant/wpa_supplicant.conf";
        File::create(file_path)
            .and_then(|mut file| file.write_all(config.as_bytes()))
            .map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("Failed to write config: {}", e),
                )
            })?;

        // Kill existing wpa_supplicant
        let _ = Command::new("pkill")
            .arg("wpa_supplicant")
            .output()
            .map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("Failed to kill wpa_supplicant: {}", e),
                )
            })?;

        // Start wpa_supplicant
        let wpa_output = Command::new("/usr/sbin/wpa_supplicant")
            .args(&["-B", "-i", interface, "-c", "/etc/wpa_supplicant/wpa_supplicant.conf"])
            .output()
            .map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("Command execution failed: {}", e),
                )
            })?;

        if !wpa_output.status.success() {
            let error = String::from_utf8_lossy(&wpa_output.stderr);
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("wpa_supplicant restart failed: {}", error),
            ));
        }

        // Request IP with dhclient
        let dhclient_output = Command::new("/usr/sbin/dhclient")
            .arg(interface)
            .output()
            .map_err(|e| {
                std::io::Error::new(
                    std::io::ErrorKind::Other,
                    format!("dhclient execution failed: {}", e),
                )
            })?;

        if !dhclient_output.status.success() {
            let error = String::from_utf8_lossy(&dhclient_output.stderr);
            return Err(std::io::Error::new(
                std::io::ErrorKind::Other,
                format!("dhclient failed: {}", error),
            ));
        }

        // Wait for network
        if !wait_for_network_with_interface(30, interface) {
            return Err(std::io::Error::new(
                std::io::ErrorKind::TimedOut,
                "Network not available after 30 seconds",
            ));
        }

        // Trigger systemd-timesyncd
        trigger_timesyncd()?;

        Ok(())
    })
    .await;

    // Handle the result and return an HTTP response
    match result {
        Ok(Ok(())) => {
            let redirect_url = env::var("KIOSK_HOMEPAGE_URL")
                .unwrap_or_else(|_| "https://self-order-kiosk-front.vercel.app/".to_string());
            HttpResponse::SeeOther()
                .append_header(("Location", redirect_url))
                .finish()
        }
        Ok(Err(e)) => HttpResponse::InternalServerError().body(format!("Error: {}", e)),
        Err(e) => HttpResponse::InternalServerError().body(format!("Blocking error: {}", e)),
    }
}

fn is_interface_connected(interface: &str) -> bool {
    if let Ok(state) = fs::read_to_string(format!("/sys/class/net/{}/operstate", interface)) {
        return state.trim() == "up";
    }
    false
}

fn trigger_timesyncd() -> std::io::Result<()> {
    let output = Command::new("systemctl")
        .arg("restart")
        .arg("systemd-timesyncd")
        .output()?;
    if !output.status.success() {
        eprintln!("Failed to restart systemd-timesyncd: {:?}", output);
        return Err(std::io::Error::new(std::io::ErrorKind::Other, "systemd-timesyncd restart failed"));
    }
    Ok(())
}

fn wait_for_network_with_interface(timeout_secs: u64, interface: &str) -> bool {
    let start = Instant::now();
    loop {
        if is_interface_connected(interface) {
            // Check for IP address assignment
            let output = Command::new("ip")
                .args(&["addr", "show", interface])
                .output();
            if let Ok(output) = output {
                let output_str = String::from_utf8_lossy(&output.stdout);
                if output_str.contains("inet ") {
                    return true; // Interface has an IP address
                }
            }
        }
        if start.elapsed().as_secs() > timeout_secs {
            return false;
        }
        thread::sleep(Duration::from_secs(1));
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index))
            .route("/set_wifi", web::post().to(set_wifi))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}