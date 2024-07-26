#!/bin/bash
while true; do
  inotifywait -e modify,move,create,delete /etc/nginx /etc/nginx/api_conf.d /etc/nginx/utils
  nginx -s reload
done
