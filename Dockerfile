FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

# Build ui bundle

WORKDIR /usr/src/app/ui
COPY ./ui/package*.json ./
RUN npm install && npm run build

WORKDIR /usr/src/app

EXPOSE 3000

CMD npm start