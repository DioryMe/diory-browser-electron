# !/bin/bash

echo "Installing dependencies and building the app..."
yarn && yarn build && yarn build-electron

# TESTCAFE_TEST = 1

echo "Add TESTCAFE_TEST_ENVS to electron-main.js"
export TESTCAFE_TEST_ENVS="process.env.TESTCAFE_TEST=1";
awk 'BEGIN{print ENVIRON["TESTCAFE_TEST_ENVS"]}{print}' electron-main.js > electron-main-tmp.js
cp electron-main.js electron-main-original.js
mv electron-main-tmp.js electron-main.js
unset TESTCAFE_TEST_ENVS

echo "Run Testcafe E2E tests"
rm -rf tmp/screenshots
yarn exec testcafe "electron:."  electron/spec/testcafe-e2e.test.js

echo "Check screenshots taken by Testcafe:"
echo "$(pwd)/tmp/screenshots/welcome-room.png"
echo "$(pwd)/tmp/screenshots/added-room.png"
echo "--- Press enter to continue ---"
read press_enter_to_continue

echo "Remove TESTCAFE_TEST_ENVS to electron-main.js"
mv electron-main-original.js electron-main.js

# BINARY_BUILD = 1

echo "Add APP_PACKAGE_ENVS from electron-main.js"
export APP_PACKAGE_ENVS="process.env.BINARY_BUILD=1";
awk 'BEGIN{print ENVIRON["APP_PACKAGE_ENVS"]}{print}' build/electron-main.js > build/electron-main-tmp.js
mv build/electron-main-tmp.js build/electron-main.js
unset APP_PACKAGE_ENVS
