FROM abiosoft/caddy

COPY ./app/index.html /srv/index.html
COPY ./app/dist /srv/dist
