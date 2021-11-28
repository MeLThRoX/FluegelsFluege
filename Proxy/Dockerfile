FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d

EXPOSE 80/tcp
EXPOSE 5000/tcp

CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /usr/share/nginx/html