#!/bin/bash

systemctl stop caster-backend.service
systemctl disable caster-backend.service

rm -rf /usr/bin/fantastic-journey
rm -rf /lib/systemd/system/caster-backend.service

systemctl daemon-reload