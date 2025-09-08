#!/bin/bash

HERE="${BASH_SOURCE%/*}"

if [[ -z $(which docker) ]]; then
    echo "Docker is not installed. Please install Docker to proceed."
    exit 1
fi

if [[ ! -f "$HERE/.env" ]]; then
    cp "$HERE/.env.dist" "$HERE/.env"
    echo "Created .env file from .env.dist. Please edit the .env file to configure your environment."
fi

docker compose --env-file "$HERE/.env" up -d

yarn install
yarn build
yarn start
