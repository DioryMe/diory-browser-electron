# !/bin/bash

echo "Installing dependencies and building the app..."
yarn && yarn build && yarn build-electron

echo "Add app-package-envs to electron-main.js"
export TESTCAFE_TEST_ENVS="process.env.TESTCAFE_TEST=1";
awk 'BEGIN{print ENVIRON["TESTCAFE_TEST_ENVS"]}{print}' electron-main.js > electron-main-tmp.js
cp electron-main.js electron-main-original.js
mv electron-main-tmp.js electron-main.js
unset TESTCAFE_TEST_ENVS

yarn exec testcafe "electron:."  electron/spec/testcafe-e2e.test.js

mv electron-main-original.js electron-main.js

