# Cypress

## Run tests

```
yarn cypress run
```

## Open dashboard

Runs tests automatically after every file change.

```
yarn cypress open
```

## Using @pending and @focus

We have configured Cypress to run all the tests except the ones with @pending tag.

That is done in `cypress.json` config file by adding an env
```
// @pending
{
  "env": {
    ...
    "TAGS": "not @pending"
  }
}
```

With the default config you can't use @focus tag. But if you remove / empty the TAGS env, then @focus starts to work and only tests with @focus tag are run (or if there are no @focus tags then all the tests are run despite of @pending)

```
// @focus
{
  "env": {
    ...
    "TAGS": ""
  }
}
```
