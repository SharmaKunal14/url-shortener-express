FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

ENV NODE_ENV=prod

COPY . .

USER node

CMD ["npm", "start"]

EXPOSE 8000
