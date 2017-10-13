FROM nginx
COPY keys /run/
COPY nginx.conf /etc/nginx/
COPY mime.types /etc/nginx/

RUN mkdir -p /app/dist
COPY ../f2f-gateway/html /app/dist

CMD nginx -g 'daemon off;'
