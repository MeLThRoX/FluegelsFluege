FROM node:alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]