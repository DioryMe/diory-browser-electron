# Development environment

## Known issues
* [ ] When running e.g. `yarn upgrade --latest` in container, yarn.lock is not modified
* [ ] Husky is not working in container, so local yarn install is required
  * Error "Can't find Husky, skipping pre-commit hook You can reinstall it using 'npm install husky --save-dev' or delete this hook"
  * Needs git config to container, add new volume: \~/.gitconfig:/etc/gitconfig



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
* requires
  * running yarn install locally
  * Node 12 locally

