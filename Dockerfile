FROM node:9
RUN npm i -g typescript
WORKDIR /app
COPY package*.json ./
Run npm i --only=production
ADD . /app
RUN npm run build
ENTRYPOINT ["npm", "start"]
