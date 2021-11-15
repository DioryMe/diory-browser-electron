
# Heavily influenced by https://github.com/geekduck/docker-node-canvas
FROM node:14

RUN apt-get update \
  && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN mkdir -p /app/diffs
WORKDIR /app
ADD . /app
RUN yarn

ENTRYPOINT ["node", "visual-regression-compare.js"]
