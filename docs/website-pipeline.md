```
aws sts get-session-token --serial-number arn-of-the-mfa-device --token-code code-from-token
export AWS_ACCESS_KEY_ID=RoleAccessKeyID
export AWS_SECRET_ACCESS_KEY=RoleSecretKey
export AWS_SESSION_TOKEN=RoleSessionToken
aws s3 ls
```

```
aws cloudformation deploy \
  --template-file aws/build-pipeline-cf.yaml \
  --stack-name dda-build-pipeline \
  --capabilities CAPABILITY_IAM
```

```
aws s3 cp ./website/index.html s3://dda-downloads --acl public-read

aws s3 cp ./website/latest-mac.html s3://dda-downloads --acl public-read \
  --website-redirect "/Diory - Digital Memory Browser-0.3.7.dmg"

aws s3 cp ./website/latest-win.html s3://dda-downloads --acl public-read \
  --website-redirect "/Diory - Digital Memory Browser-0.3.7.dmg"
```

