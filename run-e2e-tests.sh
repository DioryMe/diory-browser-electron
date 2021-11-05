# !/bin/bash

# Always run until the end & cleanup (=ignore failures=
set +e

# Build frontend changes before running tests (although not necessary on CI pipeline)
yarn build

mkdir tmp
rm -rf tmp/testcafe-diograph-folder
rm -rf tmp/test-my-diory
rm -rf tmp/My\ Diory
cp electron-main.js electron-main-original.js

echo "Run Testcafe E2E test 1 (import diory-demo-content)"
awk 'BEGIN{print "process.env.TESTCAFE_TEST=1;"}{print}' electron-main.js > electron-main-tmp.js
mv electron-main-tmp.js electron-main.js
cp -r public/diory-demo-content/ tmp/testcafe-diograph-folder/
# FIXME: Implement import folder for folders with diograph.json
rm tmp/testcafe-diograph-folder/diograph.json
npx testcafe "electron:." electron/spec/testcafe-e2e-1.test.js
test_1=$?
rm -rf tmp/testcafe-diograph-folder
rm -rf tmp/My\ Diory

echo "Run Testcafe E2E test 2 (import diory-demo-content + delete diory + check audio diory.data)"
cp -r electron/readers/example-folder/ tmp/testcafe-diograph-folder/
npx testcafe "electron:." electron/spec/testcafe-e2e-2.test.js
test_2=$?
rm -rf tmp/testcafe-diograph-folder
rm -rf tmp/My\ Diory

echo "Run Testcafe E2E test 3 (import example-folder + re-choose example-folder)"
awk 'BEGIN{print "process.env.TESTCAFE_TEST=2;"}{print}' electron-main-original.js > electron-main-tmp.js
mv electron-main-tmp.js electron-main.js
cp -r electron/readers/example-folder tmp/testcafe-diograph-folder/
mkdir tmp/test-my-diory
cp -r public/diory-demo-content/ tmp/test-my-diory/My\ Diory
npx testcafe "electron:." electron/spec/testcafe-e2e-3.test.js
test_3=$?
rm -rf tmp/testcafe-diograph-folder
rm -rf tmp/test-my-diory
rm -rf tmp/My\ Diory

# echo "Run Testcafe E2E test 4 (with development-content-room + example-folder as subfolder + Tampere folder diograph.json)"
# => loads diograph.json from Tampere subfolder properly
#     => if this works then that diograph.json has to be deleted before test 1

echo "Remove TESTCAFE_TEST_ENV from electron-main.js"
mv electron-main-original.js electron-main.js

# If any of the tests fail, fail the script by returning non-zero exit code
if [[ test_1 -ne 0 || test_2 -ne 0 || test_3 -ne 0 ]]; then exit 1; fi
