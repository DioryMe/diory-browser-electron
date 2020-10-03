# Upgrading packages

Updgrading packages should be as easy as possible. We assume that our test suite will bring up all the problems that may arise

## Default process, the happy path

1. Remove the resolutions

2. ```shell
$ docker-compose exec build yarn upgrade --latest
$ git commit package.json yarn.lock -m "Upgrade packages: yarn upgrade --latest"
```

Then just check that the tests pass. And that's it!

**NOTE:** After this kind of update everybody should rebuild their docker images (`docker-compose build`) and/or run `yarn install` on their local machine.

## Security fixes

Sometimes `yarn upgrade --latest` doesn't fix all the security issues.

Then it's ok to use add the patched version of the package in the [resolutions in package.json](https://classic.yarnpkg.com/en/docs/selective-version-resolutions/):

```js
"resolutions": {
  "minimist": "^0.2.1",
  "acorn": "^7.1.1",
  "kind-of": "^6.0.3"
}
```

## Updating Node and Yarn

Node and Yarn are outside of `package.json` so they are not upgraded by `yarn upgrade --latest`.

Node version should be updated every time Electron moves on using the next Node version.

1. Check the Node version of the Electron from [stable releases page](https://www.electronjs.org/releases/stable)
1. Change that version to `Dockerfile`, e.g. `FROM node:12.13`
2. Change that version for all the Github Actions
1. Yarn is updated as a part of the Docker image.
  * Docker image's Dockerfile and YARN_VERSION from [Docker hub](https://hub.docker.com/_/node/) by selecting the version

**NOTE:** After this kind of update everybody should rebuild their docker images (`docker-compose build`) and/or set Node to the specific version on their local machine (e.g. `nvm use 12.13`) (and maybe also somehow update yarn?)

## FAQ

### How often this should be done?

Every Release should start with it. At least once a quarter OR when another major version of Electron or React is published (e.g. 10 when we have 8)

### Why we should do this?

It's not only about being cool. There's also real reasons:

1. More often you do it the easier it is
1. Performance
1. Security
1. New features
1. Bug fixes

### Why it's not always trivial?

Packages can change in a major way and our stuff can break. Then you have to also fix the problems while upgrading the packages. To make that as trivial as possible, we want to do it at least once every quarter.

