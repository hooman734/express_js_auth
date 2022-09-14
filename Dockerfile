FROM node:lts-alpine

# create app directory
WORKDIR /src/app

RUN apk add --no-cache sqlite bash

# install app dependencies
COPY package.json .
RUN yarn install

# bundle app source
ADD . .

# port
EXPOSE 3333

# entry point
ENTRYPOINT ['node', 'app.js']
