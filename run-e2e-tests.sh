# !/bin/bash
set +e

echo "Add TESTCAFE_TEST_ENVS to electron-main.js"
export TESTCAFE_TEST_ENVS="process.env.TESTCAFE_TEST=1";
awk 'BEGIN{print ENVIRON["TESTCAFE_TEST_ENVS"]}{print}' electron-main.js > electron-main-tmp.js
cp electron-main.js electron-main-original.js
mv electron-main-tmp.js electron-main.js
unset TESTCAFE_TEST_ENVS

echo "Run Testcafe E2E test 1 (with development-content-room)"
cp -r public/development-content-room/ tmp/testcafe-diograph-folder/
npx testcafe "electron:." electron/spec/testcafe-e2e-1.test.js
rm -rf tmp/testcafe-diograph-folder

echo "Run Testcafe E2E test 2 (with example-folder)"
cp -r electron/readers/example-folder/ tmp/testcafe-diograph-folder/
npx testcafe "electron:." electron/spec/testcafe-e2e-2.test.js
rm -rf tmp/testcafe-diograph-folder

# echo "Run Testcafe E2E test 3 (with development-content-room + example-folder as subfolder)"
# cp -r public/development-content-room tmp/testcafe-diograph-folder
# cp -r electron/readers/example-folder/ tmp/testcafe-diograph-folder/
# npx testcafe "electron:." electron/spec/testcafe-e2e-3.test.js
# rm -rf tmp/testcafe-diograph-folder

echo "Remove TESTCAFE_TEST_ENVS to electron-main.js"
mv electron-main-original.js electron-main.js
