# !/bin/bash
set -e

AWS_USER=jvalanen
# echo "Give aws user:"
# read AWS_USER

echo "Choose git-repo-branch:"
read GIT_BRANCH

echo "Give AppleID credentials for notarization..."
echo "AppleID email:"
read apple_id
echo "App-specific password for diory-browser-electron:"
read -s apple_id_pass

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
# Intel macs
APPLEID=$apple_id APPLEIDPASS=$apple_id_pass yarn package-mac --x64
# M1 macs
APPLEID=$apple_id APPLEIDPASS=$apple_id_pass yarn package-mac --arm64

echo "Uploading the .dmg binaries to AWS..."
aws-vault exec $AWS_USER -- aws s3 cp dist/ s3://dda-downloads --recursive --exclude "*" --include "*.dmg" --acl public-read
echo "Triggering the pipeline..."
aws-vault exec $AWS_USER -- aws codepipeline start-pipeline-execution --name DioryDemoApp-build-pipeline

echo "Removing temp folder..."
cd ~
rm -rf ~/temp-package-mac

echo "Done."
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
