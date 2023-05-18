FROM node:18.16-alpine as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .

RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx as runtime
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/hahn-client .
COPY /nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
