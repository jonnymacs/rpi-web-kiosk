use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use serde::Deserialize;
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
    let ssid = &form.ssid;
    let password = &form.password;

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
    let interface = "wlan0"; // Replace with your actual interface (e.g., wlp2s0) or use dynamic detection

    match File::create(file_path).and_then(|mut file| file.write_all(config.as_bytes())) {
        Ok(_) => {
            // Kill existing wpa_supplicant
            let _ = Command::new("pkill").arg("wpa_supplicant").output();

            // Restart wpa_supplicant
            let wpa_output = Command::new("/usr/sbin/wpa_supplicant")
                .args(&["-B", "-i", interface, "-c", "/etc/wpa_supplicant/wpa_supplicant.conf"])
                .output();

            match wpa_output {
                Ok(result) if result.status.success() => {
                    // Request IP with dhclient
                    let dhclient_output = Command::new("/usr/sbin/dhclient")
                        .arg(interface)
                        .output();

                    match dhclient_output {
                        Ok(result) if result.status.success() => {
                            let redirect_url = env::var("KIOSK_HOMEPAGE_URL")
                                .unwrap_or_else(|_| "https://self-order-kiosk-front.vercel.app/".to_string());
                            HttpResponse::SeeOther()
                                .append_header(("Location", redirect_url))
                                .finish()
                        }
                        Ok(result) => {
                            let error = String::from_utf8_lossy(&result.stderr);
                            HttpResponse::InternalServerError()
                                .body(format!("dhclient failed: {}", error))
                        }
                        Err(e) => HttpResponse::InternalServerError()
                            .body(format!("dhclient execution failed: {}", e)),
                    }
                }
                Ok(result) => {
                    let error = String::from_utf8_lossy(&result.stderr);
                    HttpResponse::InternalServerError()
                        .body(format!("wpa_supplicant restart failed: {}", error))
                }
                Err(e) => HttpResponse::InternalServerError()
                    .body(format!("Command execution failed: {}", e)),
            }
        }
        Err(e) => HttpResponse::InternalServerError().body(format!("Failed to write config: {}", e)),
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