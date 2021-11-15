# Visual regression compare tool

Custom build way to detect visual regression from screenshots taken during the E2E tests.
Uses node-canvas and rembrandt packages.

## How to test visual regression? (locally)

1. Run E2E tests

```
./run-e2e-tests.sh
```

2. Copy results to test/ folder

```
cp -r tmp/screenshots screenshots/test
```

3. Run visual regression compare tool

```
cd screenshots
./run-visual-regression-tests.sh
```

4. Inspect diffs / composition images

```
open diffs
```

## Appveyor images

Appveyor also takes screenshots and saves them as artifacts.
They are lower quality and not suitable for real comparing but can be used as reference material.
They are available also from Windows.

### Download

1. Go to ci.appveyor.com
2. Choose / Current build -> Artifacts
3. Download tmp/vr.zip from link

## TODO

- [ ] Push docker image to docker hub and use it in script (no need to build it every time)
