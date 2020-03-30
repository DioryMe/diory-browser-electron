# Development environment

## Known issues

* [ ] .env file is needed to set CI=true and SKIP_PREFLIGHT_CHECK=true => remove it asap
* [ ] When running e.g. `yarn upgrade --latest` in container, yarn.lock is not modified
* [ ] Husky is not working in container, so local yarn install is required
  * Error "Can't find Husky, skipping pre-commit hook You can reinstall it using 'npm install husky --save-dev' or delete this hook"
  * Needs git config to container, add new volume: `\~/.gitconfig:/etc/gitconfig`

## Docker

Start development server in http://localhost:3300
```
docker-compose up
```

Same container can be used e.g. debugging Github Action stuff
```
# Get inside of container
$ docker-compose run --rm react bash

# Run the same command as Github Action
root@af26de6f61ae:/app# yarn eslint
```

## Husky

Pre-commit hook that runs Prettier

Requirements:
  * Running `yarn install` locally (creates `node_modules` folder)
  * Node 12 locally (`nvm use 12`)


## Changelog

### 2020-03-30

**Added**:
* Initial docker environment with docker-compose.yml and Dockerfile
* Initial description of our development-environment (this doc)
