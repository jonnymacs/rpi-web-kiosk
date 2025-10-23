# ~/.bash_profile

# Ensure runtime dir is set for Wayland (important for cage + Chromium)
export XDG_RUNTIME_DIR="/run/user/$(id -u)"
mkdir -p "$XDG_RUNTIME_DIR"
chmod 700 "$XDG_RUNTIME_DIR"

# Start kiosk only on TTY1 and if no graphical session is running
if [ -z "$DISPLAY" ] && [ "$(tty)" = "/dev/tty1" ]; then
  # echo "Starting kiosk..."
  # ls
  # usbreset
  # pm2 status
  # pm2 logs
  exec startx
fi