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

## Features

### Rooms
- Update room
- Add room
- Delete room (TODO)
- Drag border to resize
- Change room

### Diory browser
- Contexts (in header)
  - Select to show story
- Story
- Memories
  - Select to show story
- Content shows/plays
  - Image
  - Audio
  - Video
  - PDF

#### Add memories to stories 
- Drag and drop diories
  - memory to hand (temporal storage)
  - hand to memory
  - hand to story
  - story to hand
  - on top of each other (both on grid and on hand)

### Lenses
1. Graph
   - Select diory to show story
2. Map
   - Select marker to show diory
   - Select diory to show story
3. Search
   - Create diory from query
   - Select diory to show story
   - Drag diory to add to story
4. Timeline (disabled)

- Drag border to resize

### Tools
1. Create diory
2. Update diory
3. Delete diory
4. Move location (Map lens only)
5. Create diory to location (Map lens only)
