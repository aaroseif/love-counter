FROM nginx:alpine

RUN apk add --no-cache gettext

# Copy template with placeholders
COPY index.html /usr/share/nginx/html/index.html.template
COPY script.js /usr/share/nginx/html/script.js.template
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY favicon-32x32.png /usr/share/nginx/html/
COPY favicon-16x16.png /usr/share/nginx/html/

# Environment substitution on container start
CMD envsubst < /usr/share/nginx/html/index.html.template > /usr/share/nginx/html/index.html \
    && envsubst < /usr/share/nginx/html/script.js.template > /usr/share/nginx/html/script.js \
    && nginx -g 'daemon off;'
