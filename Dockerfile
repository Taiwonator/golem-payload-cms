FROM node:14-alpine AS builder

ARG PAYLOAD_PUBLIC_BASE_DNS

RUN mkdir -p /app
WORKDIR /app

COPY package.json  .
COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn cache clean
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "run", "serve" ]