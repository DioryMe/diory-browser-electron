# Website & pipeline

Our website is basically just a place to download our app for MacOS and Windows.

## How to update?

1. Merge the code you want to use to 'develop' branch
2. Generate new MacOS app (see app-packages.md for details) and upload it to S3
```
aws s3 cp Diory\ -\ Digital\ Memory\ Browser-0.3.7.dmg s3://dda-downloads --acl public-read
```
3. Update the version number to MAC_BINARY_FILENAME and WINDOWS_BINARY_FILENAME in the build-pipeline-cf.yaml
4. Trigger the pipeline from the aws console by clicking "Release change": https://eu-north-1.console.aws.amazon.com/codesuite/codepipeline/pipelines/DioryDemoApp-build-pipeline/view?region=eu-north-1

## Website

There's only one real page, `index.html` which is found under `/website`

latest-mac.html and latest-win.html are for easy redirecting to the latest version. They are uploaded and redirection are reset to the latest version every time we build new binaries.

## Cloudformation deploy

If you need to change the resources (=cloudformation template), you can deploy it with the following command:

```
aws cloudformation deploy \
  --template-file aws/build-pipeline-cf.yaml \
  --stack-name dda-build-pipeline \
  --capabilities CAPABILITY_IAM
```
