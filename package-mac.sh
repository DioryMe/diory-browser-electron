# !/bin/bash

# mkdir ~/temp-package-mac
# cd ~/temp-package-mac
# echo "Cloning clean code from Github to $(pwd)..."
# git clone git@github.com:DioryMe/diory-browser-electron.git
# cd diory-browser-electron
echo "Installing dependencies and building the app..."
yarn && yarn build && yarn build-electron
echo "Create MacOS distribution package..."
yarn package-mac
# rm -r ~/temp-package-mac/diory-browser-electron/*
# rm -r ~/temp-package-mac
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"

# aws --profile diory-electron s3 cp dist/*.dmg s3://jvalanen-codebuild-test
