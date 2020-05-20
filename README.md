# Diory Browser Electron

## Get started

### 1. React development in Docker
1. `docker-compose up` or `yarn start`
1. Electron app is launched and loads `http://localhost:3300` to its window

### 2. Electron development (with /public folders)
1. Install Node 12 and yarn
1. `yarn install`
1. `docker-compose up` or `yarn start` (in one terminal tab)
1. `yarn start-electron-dev-tools` (in another terminal tab)
1. Electron app is launched and loads `http://localhost:3300` to its window

### 3. Electron production (with any local folder)
1. Install Node 12 and yarn
1. `yarn install` (to install electron, electron-store and other electron dependencies...)
1. `docker-compose run --rm react yarn build-and-start-electron`
1. Electron app is launched and loads `./build` folder to its window
