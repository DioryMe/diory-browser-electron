# !/bin/bash
set -e

echo "Choose git-repo-branch:"
read GIT_BRANCH

echo "Give AppleID credentials for notarization..."
echo "AppleID email:"
read apple_id
echo "App-specific password for diory-browser-electron:"
read -s apple_id_pass

echo "Login to AWS..."
echo "Input MFA from your Authenticator (jvalanen-private):"
read mfa_code
export AWS_TOKEN_CODE=$mfa_code
export AWS_LOGIN_TMP=$(aws sts get-session-token --serial-number arn:aws:iam::037977746924:mfa/jvalanen-private --token-code $AWS_TOKEN_CODE)
export AWS_ACCESS_KEY_ID=$(echo $AWS_LOGIN_TMP | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo $AWS_LOGIN_TMP | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo $AWS_LOGIN_TMP | jq -r .Credentials.SessionToken)

echo "Create a temp directory to ~/temp-package-mac..."
# Remove directory if it exists
[ ! -d "~/temp-package-mac" ] && rm -rf ~/temp-package-mac
mkdir ~/temp-package-mac
cd ~/temp-package-mac
echo "Cloning clean code from Github to $(pwd)..."
git clone git@github.com:DioryMe/diory-browser-electron.git
cd diory-browser-electron
git checkout $GIT_BRANCH

# Run common stuff (build & add BINARY_BUILD=1 to electron-main.js)
bash ./package-common.sh

echo "Creating MacOS distribution packages..."
APPLEID=$apple_id APPLEIDPASS=$apple_id_pass yarn package-mac --x64
APPLEID=$apple_id APPLEIDPASS=$apple_id_pass yarn package-mac --arm64

echo "Uploading the .dmg binary to AWS..."
aws s3 cp dist/*.dmg s3://dda-downloads --acl public-read
echo "Triggering the pipeline..."
aws codepipeline start-pipeline-execution --name DioryDemoApp-build-pipeline
unset AWS_TOKEN_CODE AWS_LOGIN_TMP AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_SESSION_TOKEN

echo "Removing temp folder..."
cd ~
rm -rf ~/temp-package-mac

echo "Done."
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
