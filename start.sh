#!/bin/bash

# Kiil remaining process
killall socat 2>/dev/null
sleep 1

if [ ! -e /dev/cu.usbserial-220 ]; then
    echo "Error : Don't find SkyConnect on /dev/cu.usbserial-220"
    exit 1
fi

# Launch socat in background
socat -v TCP-LISTEN:12345,reuseaddr,fork /dev/cu.usbserial-220,raw,echo=0,ispeed=115200,ospeed=115200,crtscts=1 > socat.log 2>&1 &

sleep 2

# Check if port 12345 is open
#lsof -nP -iTCP:12345 -sTCP:LISTEN

docker compose up -d

echo "Script run successfully"
