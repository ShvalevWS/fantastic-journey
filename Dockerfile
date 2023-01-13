FROM node:16-alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start"]