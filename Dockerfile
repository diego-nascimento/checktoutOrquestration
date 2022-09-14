FROM node:alpine
WORKDIR /app

COPY /src .
COPY ./package.json .
COPY ./tsconfig.json .
RUN apk update && apk add bash
RUN apk add yarn
RUN  yarn install
RUN yarn build






