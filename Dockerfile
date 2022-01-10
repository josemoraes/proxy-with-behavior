FROM node:17-alpine as build-stage
WORKDIR /app
COPY ./ .
RUN npm install
RUN npx sequelize-cli db:migrate

FROM node:17-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app /app
EXPOSE 3000 3001
CMD [ "node", "index.js" ]