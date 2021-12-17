# !/bin/bash

# Always run until the end & cleanup (=ignore failures=
set +e

# Build frontend changes before running tests (although not necessary on CI pipeline)
yarn build

mkdir tmp
rm -rf tmp/My\ Diory
cp electron-main.js electron-main-original.js

echo "Run electron/spec/testcafe-e2e-1.test.js"
awk 'BEGIN{print "process.env.TESTCAFE_TEST=1;"}{print}' electron-main.js > electron-main-tmp.js
mv electron-main-tmp.js electron-main.js
npx testcafe "electron:." electron/spec/testcafe-e2e-1.test.js
test_1=$?
rm -rf tmp/My\ Diory

echo "Run electron/spec/testcafe-e2e-2.test.js"
awk 'BEGIN{print "process.env.TESTCAFE_TEST=2;"}{print}' electron-main-original.js > electron-main-tmp.js
mv electron-main-tmp.js electron-main.js
cp -r public/diory-demo-content/ tmp/My\ Diory
npx testcafe "electron:." electron/spec/testcafe-e2e-2.test.js
test_2=$?
rm -rf tmp/My\ Diory

echo "Remove TESTCAFE_TEST_ENV from electron-main.js"
mv electron-main-original.js electron-main.js

# If any of the tests fail, fail the script by returning non-zero exit code
if [[ test_1 -ne 0 || test_2 -ne 0 ]]; then exit 1; fi
