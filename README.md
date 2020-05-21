# Diory Browser Electron

## Get started

### 1. React development
1. `docker-compose up` (or `yarn start`)
1. React things are served in `http://localhost:3300`

### 2. Electron development
1. Install Node 12 and yarn
1. `yarn install` (to install local electron dependencies...)
1. `docker-compose up` (or `yarn start`) (in one terminal tab)
1. `yarn start-electron-dev-tools` (in another terminal tab)
1. Electron app loads `http://localhost:3300` to its window and is restarted on every code change

### 3. Electron production (with any local folder)
1. Install Node 12 and yarn
1. `yarn install` (to install local electron dependencies...)
1. `yarn build-and-start-electron`
1. Electron app loads `./build` folder to its window
