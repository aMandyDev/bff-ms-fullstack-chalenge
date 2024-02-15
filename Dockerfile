FROM node:20
COPY ./ /app
RUN cd /app \
    && npm install
WORKDIR /app

CMD [ "node", "dist/v1/index.js" ]