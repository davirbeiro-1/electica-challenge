FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev 

COPY . .
RUN chmod +x ./node_modules/.bin/nest
RUN npm run build 
EXPOSE 3000

CMD [ "npm", "start:prod" ] 