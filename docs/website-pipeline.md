# Website & pipeline

Our website is basically just a place to download our app for MacOS and Windows.

## How to update?

1. Make changes to `./website`
2. Merge changes to develop
3. Pipeline is triggered changes will be applied as a part of it

## Website

Currently there's only one real page, `./website/index.html`

`latest-mac.html`, `latest-mac-m1.html` and `latest-win.html` are intentionally empty files. They are used for redirecting to the latest version. Redirection is reset to the latest version every time we make a new release.

## Cloudformation deploy

If you need to change the resources (=cloudformation template), you can deploy it with the following command:

```
aws cloudformation deploy \
  --template-file aws/build-pipeline-cf.yaml \
  --stack-name dda-build-pipeline \
  --capabilities CAPABILITY_IAM
```
