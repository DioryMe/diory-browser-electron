# !/bin/bash

echo "Installing dependencies and building the app..."
yarn && yarn build && yarn build-electron

# BINARY_BUILD = 1

echo "Add APP_PACKAGE_ENVS from electron-main.js"
export APP_PACKAGE_ENVS="process.env.BINARY_BUILD=1";
awk 'BEGIN{print ENVIRON["APP_PACKAGE_ENVS"]}{print}' build/electron-main.js > build/electron-main-tmp.js
mv build/electron-main-tmp.js build/electron-main.js
unset APP_PACKAGE_ENVS
