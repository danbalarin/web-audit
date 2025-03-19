#!/bin/bash

# tag previous build on remote

version=$(date +%s)
echo "Tagging previous build with version $version"
docker tag danbalarin/web-audit:latest danbalarin/web-audit:$version

docker push danbalarin/web-audit:$version

# build new image
echo "Building new image..."
docker build -t danbalarin/web-audit:latest .

# tag for docker compose
echo "Tagging new image for docker-compose..."
docker tag danbalarin/web-audit:latest application-app

# push new image
echo "Pushing new image..."
docker push danbalarin/web-audit:latest