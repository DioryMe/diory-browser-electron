FROM node:12.14

RUN mkdir /app
COPY package.json /app
WORKDIR /app
RUN yarn install

COPY . .

CMD yarn start
