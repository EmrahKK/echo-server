FROM node:15.6.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY server.js ./

EXPOSE 8080

CMD [ "node", "server.js" ]
