# Versioning and changelog

## How to bump the version?

1. Make an entry to CHANGELOG.md file
2. Change the version in package.json
```
yarn version --new-version 2.3.5
```
3. Push also the tag to Github: `git push --tags`
4. If you want to make a release, see: `release.md`

## Versioning

Version numbers consist of 3 parts: MAJOR.BUILD.PATCH (e.g. 0.3.7)

* MAJOR is updated on
  * every release which represents a milestone for the app
* BUILD is updated when
  * new feature or significant change to the app is added
  * starts from zero after every release
* PATCH is updated when
  * new packages for the app is built and made public
  * something is fixed

Version doesn't need to be changed if
* change is related only to linting, tests, environment, CI/CD pipeline etc.
* it's a small fix and new packages are not built

## Changelog

At least a line to the changelog should be added every time something is merged into the develop branch.

A new entry with a date should be added if the version number is changed.


### How to make an entry to CHANGELOG.md?

Take example from the previous entries.

Includes
  * Version number
  * Date of the merge
  * Task id (DDA-xxx) if one was completed
  * Brief summary about the changes

