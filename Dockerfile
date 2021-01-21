FROM registry.mkkdev.com.tr/dockerhub_proxy/library/node:15.6.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]
