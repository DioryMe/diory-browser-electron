# Linter

1. Prettier is used via pre-commit hook. It fixes format automatically on every commit.
1. Eslint is run via Github Actions. Pull request has "check" that shows if linter passes and console output can be inspected in Github.
1. IDE plugins are recommended to be set up for both Prettier and Eslint

## TODO

[ ] Turn off Prettier line length rule and add Eslint warning for it

## Changelog

### 2020-03-23

**Changed**

* Prettier line length was changed from 80 -> 120 because prettier's force-cutting is awful. Line length monitoring is preferrably done with eslint rules and prettier's line length turned off?

**Added**

* Initialized eslint eslint --init
* Added Airbnb plugin/styleguide for eslint
* Rawtuned the Airbnb plugin rules
* Converted all the errors to warnings by adding them to .eslintrc rules-section
* Also electron folder is now included
* yarn run eslint runs eslint
* yarn run prettier runs prettier
* Github Action runs eslint and reports results in pull request
