#!/bin/bash

apt-get update && apt-get upgrade

apt install python3-pip

pip install -r requirements.txt

cp -r /home/pi/fantastic-journey/ /usr/bin/

cp caster-backend.service /lib/systemd/system/

systemctl daemon-reload

systemctl enable caster-backend.service
systemctl start caster-backend.service
