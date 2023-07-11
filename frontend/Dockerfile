# Build stage
FROM node:16 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN npm run build

