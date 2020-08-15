# !/bin/bash

echo "Login to AWS... (did you remember to set AWS_TOKEN_CODE?)"
export AWS_LOGIN_TMP=$(aws sts get-session-token --serial-number arn:aws:iam::037977746924:mfa/jvalanen-private --token-code $AWS_TOKEN_CODE)
export AWS_ACCESS_KEY_ID=$(echo $AWS_LOGIN_TMP | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo $AWS_LOGIN_TMP | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo $AWS_LOGIN_TMP | jq -r .Credentials.SessionToken)

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

echo "Upload the .dmg binary to AWS..."
aws s3 cp dist/*.dmg s3://dda-downloads --acl public-read
echo "Trigger the pipeline..."
aws codepipeline start-pipeline-execution --name DioryDemoApp-build-pipeline
unset AWS_TOKEN_CODE AWS_LOGIN_TMP AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN

# cd ~
# rm -r ~/temp-package-mac
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
