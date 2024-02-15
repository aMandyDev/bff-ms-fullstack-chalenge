FROM node:20
COPY ./ /app

RUN cd /app \
    && npm install \
    && npm run build

WORKDIR /app


CMD [ "node", "dist/v1/index.js" ]