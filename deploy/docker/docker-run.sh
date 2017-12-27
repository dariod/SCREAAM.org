#!/bin/sh
# Modify the following or set WEBROOT to match where the web site is on the host:
WEBROOT=${WEBROOT:-/Users/dario/Library/Mobile Documents/com~apple~CloudDocs/Projects/SCREAAM.org}
docker run --name screaam -d --restart unless-stopped -p 80:80  -v "${WEBROOT}":/usr/share/nginx/html:ro nginx:latest
