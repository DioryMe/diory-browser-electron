# !/bin/bash

docker build -t visual-regression .

for TEST_FOLDER in $(ls baseline/)
do
  for SCREENSHOT_NAME in $(ls ./baseline/$TEST_FOLDER)
  do
    docker run -v $(pwd)/diffs:/app/diffs -t visual-regression \
      baseline/$TEST_FOLDER/$SCREENSHOT_NAME \
      test/$TEST_FOLDER/$SCREENSHOT_NAME
  done
done
