FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apt update && apt install -y ffmpeg

COPY . .

EXPOSE 3000

RUN node deploy-commands.js

CMD [ "node", "index.js" ]