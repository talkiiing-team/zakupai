#!/usr/bin/env bash

export DISPLAY=:0
rm -f /tmp/.X0-lock # from not cleanly stopping the container

uname -a

echo -e "\n### Starting Xvfb..."
Xvfb -ac -screen 0 2160x3840x24 &

echo -e "\n### Starting fluxbox..."
fluxbox -screen 0 &> /dev/null &

echo -e "\n### Starting x11vnc..."
x11vnc -passwd ${VNC_PASSWORD:-password} -N -forever -rfbport 5900 &> /dev/null &

echo -e "\n### done with entrypoint.sh handing over to cmd"
echo -e "\n### pwd: $(pwd)"
echo -e "\n### cmd: $@"
"$@"

echo -e "\n### cmd finished"