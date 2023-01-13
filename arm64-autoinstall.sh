#!/bin/bash

sudo apt-get update

sudo apt-get install ca-certificates curl gnupg lsb-release

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

docker compose -f docker-compose.yml up -d
