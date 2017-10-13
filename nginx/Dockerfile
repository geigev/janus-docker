FROM nginx
COPY keys /run/
COPY nginx.conf /etc/nginx/
COPY mime.types /etc/nginx/

RUN mkdir -p /app/dist
COPY ../janus-gateway/html /app/dist

CMD nginx -g 'daemon off;'
