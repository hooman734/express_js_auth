FROM node:latest

# create app directory
WORKDIR /src/app

# install app dependencies
COPY package.json ./
RUN yarn install

# bundle app source
ADD . .

# port
EXPOSE 3333

# entry point
ENTRYPOINT 'node' 'app.js'
