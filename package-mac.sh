# !/bin/bash

# mkdir ~/temp-package-mac
# cd ~/temp-package-mac
# echo "Cloning clean code from Github to $(pwd)..."
# git clone git@github.com:DioryMe/diory-browser-electron.git
# cd diory-browser-electron

echo "Installing dependencies and building the app..."
yarn && yarn build && yarn build-electron

# Add app-package-envs to electron-main.js
export APP_PACKAGE_ENVS="process.env.BINARY_BUILD=1";
awk 'BEGIN{print ENVIRON["APP_PACKAGE_ENVS"]}{print}' build/electron-main.js > build/electron-main-tmp.js
mv build/electron-main-tmp.js build/electron-main.js
unset APP_PACKAGE_ENVS

echo "Create MacOS distribution package..."
yarn package-mac
# aws s3 cp dist/*.dmg s3://dda-downloads --acl public-read
# cd ~
# rm -r ~/temp-package-mac
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
