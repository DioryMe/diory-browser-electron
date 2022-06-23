FROM node:16.14.2

RUN mkdir /app
WORKDIR /app

COPY package.json package.json
RUN yarn install && mv node_modules /node_modules
RUN ln -s /node_modules/ node_modules

COPY . .

CMD yarn start
