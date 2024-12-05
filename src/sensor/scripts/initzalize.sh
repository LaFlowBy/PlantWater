#!/bin/bash

# Initialize PlantWater service

SERVICE_NAME="plantwater"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"

# Create the service file
cat <<EOL > $SERVICE_FILE
[Unit]
Description=My Python Script Service
After=network.target

[Service]
ExecStart=python3 /home/florian/Repos/PlantWater/src/sensor/main.py
Restart=always
User=florian
WorkingDirectory=/home/florian/Repos/PlantWater/src/sensor

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd to recognize the new service
sudo systemctl daemon-reload

# Enable the service to start on boot
sudo systemctl enable $SERVICE_NAME

# Start the service
sudo systemctl start $SERVICE_NAME

echo "PlantWater service has been initialized and started."