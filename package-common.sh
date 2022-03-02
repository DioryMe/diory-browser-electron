# !/bin/bash

echo "Installing dependencies and building the app..."
yarn
# Build missing sharp binaries
# - NOTE: This assumes that release is done on arm64 / M1 Mac (on Intel replace x64 with arm64)
# - TODO: Make condition which detects used architecture and installs missing sharp binaries accordingly
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm_config_arch=x64 npm_config_platform=darwin yarn add sharp
yarn build && yarn build-electron

echo "Add APP_PACKAGE_ENVS from electron-main.js"
export APP_PACKAGE_ENVS="process.env.BINARY_BUILD=1";
awk 'BEGIN{print ENVIRON["APP_PACKAGE_ENVS"]}{print}' build/electron-main.js > build/electron-main-tmp.js
mv build/electron-main-tmp.js build/electron-main.js
unset APP_PACKAGE_ENVS
