FROM node:16-alpine AS development

ENV NODE_ENV development

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY . .

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

RUN npm install --verbose

EXPOSE 3000

CMD [ "npm", "start"]
