# !/bin/bash
set -e

# Run common stuff (build & add BINARY_BUILD=1 to electron-main.js)
bash ./package-common.sh

# Intel macs
yarn package-mac-rc --x64

# M1 macs
yarn package-mac-rc --arm64

echo "Done."
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
