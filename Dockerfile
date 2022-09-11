FROM node:16

# create app directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# bundle app source
COPY . .

# port
EXPOSE 8080

CMD ["node", 'app.js']
