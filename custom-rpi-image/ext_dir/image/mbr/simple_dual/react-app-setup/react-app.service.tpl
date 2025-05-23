[Unit]
Description=React App
After=network.target

[Service]
ExecStart=/home/<KIOSK_USER>/app/bin/serve -s build
WorkingDirectory=/home/<KIOSK_USER>/app
Restart=always
User=<KIOSK_USER>
Environment=NODE_ENV=production
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target