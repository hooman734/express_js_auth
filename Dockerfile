FROM node:18-alpine3.15
# create app directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN yarn install

# bundle app source
ADD . .

# port
EXPOSE 8080

CMD "node" 'app.js'
