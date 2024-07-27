FROM nginx:latest

RUN apt-get update \
    && apt-get install -y nginx-module-njs inotify-tools \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80