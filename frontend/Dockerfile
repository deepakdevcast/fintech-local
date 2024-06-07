FROM node:22.2.0-alpine3.20

WORKDIR /frontend

COPY package*.json .

RUN npm ci

COPY ./public ./public

COPY ./dist ./dist

EXPOSE 4173:4173

CMD [ "npm", "run", "serve" ]