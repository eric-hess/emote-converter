FROM node:latest as build

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY public public
COPY src src

RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY docker/ressource/nginx.conf /etc/nginx/conf.d/default.conf