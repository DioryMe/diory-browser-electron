# !/bin/bash

# Always cleanup in the end, ignore failures
set +e

# Build frontend changes before running tests (although not necessary on CI pipeline)
yarn build

mkdir tmp
rm -rf tmp/testcafe-diograph-folder

echo "Add TESTCAFE_TEST_ENVS to electron-main.js"
awk 'BEGIN{print "process.env.TESTCAFE_TEST=1;" ENVIRON["TESTCAFE_TEST_ENV"]}{print}' electron-main.js > electron-main-tmp.js
cp electron-main.js electron-main-original.js
mv electron-main-tmp.js electron-main.js

echo "Run Testcafe E2E test 1 (with development-content-room, with diograph.json)"
cp -r public/diory-demo-content/ tmp/testcafe-diograph-folder/
npx testcafe "electron:." electron/spec/testcafe-e2e-1.test.js
test_1=$?
rm -rf tmp/testcafe-diograph-folder

echo "Run Testcafe E2E test 2 (with example-folder, no diograph.json)"
cp -r electron/readers/example-folder/ tmp/testcafe-diograph-folder/
npx testcafe "electron:." electron/spec/testcafe-e2e-2.test.js
test_2=$?
rm -rf tmp/testcafe-diograph-folder

echo "Run Testcafe E2E test 3 (with development-content-room + example-folder as subfolder)"
cp -r public/diory-demo-content tmp/testcafe-diograph-folder
cp -r electron/readers/example-folder tmp/testcafe-diograph-folder/
npx testcafe "electron:." electron/spec/testcafe-e2e-3.test.js
test_3=$?
rm -rf tmp/testcafe-diograph-folder

# echo "Run Testcafe E2E test 4 (with development-content-room + example-folder as subfolder + Tampere folder diograph.json)"
# => loads diograph.json from Tampere subfolder properly
#     => if this works then that diograph.json has to be deleted before test 1

echo "Remove TESTCAFE_TEST_ENV from electron-main.js"
mv electron-main-original.js electron-main.js

# If any of the tests fail, fail the script by returning non-zero exit code
if [[ test_1 -ne 0 || test_2 -ne 0 || test_3 -ne 0 ]]; then exit 1; fi
