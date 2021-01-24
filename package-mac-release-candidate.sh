# !/bin/bash
set -e

# Run common stuff (Testcafe tests & BINARY_BUILD = 1)
bash ./package-mac-common.sh

yarn package-mac-rc

echo "Done."
echo "All this was made with: yarn: $(yarn --version), node: $(node --version)"
