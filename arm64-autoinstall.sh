#!/bin/bash

sudo apt-get update

sudo apt-get install ca-certificates curl gnupg lsb-release

git clone https://github.com/SergeiR13/fantastic-journey

cd fantastic-journey

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

wget https://raw.githubusercontent.com/ShvalevWS/fantastic-journey/main/docker-compose.yml

docker compose -f docker-compose.yml up -d
