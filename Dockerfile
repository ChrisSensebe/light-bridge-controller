FROM node:10.15.3-jessie as build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . /app
RUN npm run build

FROM node:10.15.3-alpine
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT
COPY --from=build /app/package*.json /app/
COPY --from=build /app/healthcheck.js /app/
HEALTHCHECK --interval=30s CMD node healthcheck.js
WORKDIR /app
RUN chown -R node:node /app
USER node
RUN npm install --no-optional && npm cache clean --force
COPY --from=build /app/dist /app/dist
CMD ["node", "dist/server.js"]
