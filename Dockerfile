FROM node:22.10.0-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

COPY .env.template ./.env

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

CMD npm run move:robot validCommands.txt