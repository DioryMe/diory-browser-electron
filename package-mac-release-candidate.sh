# !/bin/bash
set -e

echo "Installing dependencies and building the app..."
yarn && yarn build && yarn build-electron

echo "Add app-package-envs to electron-main.js"
export APP_PACKAGE_ENVS="process.env.BINARY_BUILD=1";
awk 'BEGIN{print ENVIRON["APP_PACKAGE_ENVS"]}{print}' build/electron-main.js > build/electron-main-tmp.js
mv build/electron-main-tmp.js build/electron-main.js
unset APP_PACKAGE_ENVS

yarn package-mac-rc

echo "Done."
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
