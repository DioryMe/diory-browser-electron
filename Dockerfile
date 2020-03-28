FROM node:12.13

ADD package.json /app/
WORKDIR /app
RUN yarn install

ADD . /app

CMD yarn start
