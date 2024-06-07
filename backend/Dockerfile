FROM node:22.2.0-alpine3.20

WORKDIR /app

COPY ./package*.json .

RUN npm ci

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]