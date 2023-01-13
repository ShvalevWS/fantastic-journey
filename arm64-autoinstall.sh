#!/bin/bash

sudo apt-get update -y

sudo apt-get install ca-certificates curl gnupg lsb-release -y 

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

docker compose -f docker-compose.yml up -d
