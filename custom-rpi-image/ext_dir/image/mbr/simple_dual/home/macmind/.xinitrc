#!/bin/sh

xset -dpms      # Disable display power management
xset s off      # Disable screen saver
xset s noblank  # Disable screen blanking


openbox &

# Wait until port 3000 is ready (served by pm2 process)
while ! nc -z localhost 3000; do
  echo "⏳ Waiting for localhost:3000..."
  sleep 0.5
done


exec chromium \
  --kiosk http://localhost:3000 \
  --noerrdialogs --disable-infobars --disable-cursor \
  --disable-session-crashed-bubble --disable-features=TranslateUI \
  --no-first-run --start-maximized
