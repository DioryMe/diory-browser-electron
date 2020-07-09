# Development environment

## Known issues

* [ ] .env file is needed to set CI=true and SKIP_PREFLIGHT_CHECK=true => remove it asap

## Docker

Start development server in http://localhost:3300
```
docker-compose up
```

Same container can be used e.g. debugging Github Action stuff
```
# Get inside of container
$ docker-compose run --rm build bash

# Run the same command as Github Action
root@af26de6f61ae:/app# yarn eslint
```

## Husky

Pre-commit hook that runs Prettier

## Changelog

### 2020-03-30

**Added**:
* Initial docker environment with docker-compose.yml and Dockerfile
* Initial description of our development-environment (this doc)
