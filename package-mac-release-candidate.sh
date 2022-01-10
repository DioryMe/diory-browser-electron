# !/bin/bash
set -e

# Run common stuff (Testcafe tests & BINARY_BUILD = 1)
bash ./package-mac-common.sh

# Intel macs
yarn package-mac-rc-x64

# M1 macs
yarn package-mac-rc-arm64

echo "Done."
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
