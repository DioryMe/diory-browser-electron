
## 1.0.0 (June 20, 2020)

Release candidate for Release 1 milestone.

### Features
##### Navigation
- focus
- path
- history
- backward, forward, next, previous

##### Room
- focus diory in fullscreen
- linked diorys in grid

##### Map lens
- focus diory in map
- linked diorys in map

##### Folder connector
- select folder
- generate diograph from files and subfolders
- save diograph to folder
- load diograph from folder

##### Text filter
- search query input
- search diorys with query in text
- results as linked diorys

## 0.3.8 (June 17, 2020)

### DDA-25: Store roomInFocus with electron-store
- Read config.json from \~/Library/Application Support/Diory - Digital Memory Browser/
- Fallback to welcome room if config.json file is not found
- Saves roomInFocus every time a new diograph is generated

### Other
- Ignore .DS_Store and diograph.json when generating the diograph
- Update packages: Electron 9, Node 12.14, yarn 1.21 etc.
- Initial build pipeline for app packages
- Improved Docker environment
- Improved logging

## 0.3.7 (May 21, 2020)

### DDA-23: Clean code for release
- Remove home
- Remove multiple folders in room
- Remove map tools

## 0.3.6 (May 17, 2020)

### DDA-22: Getting started without home

- Show only one room
- Change room by opening another folder

## 0.3.5 (April 13, 2020)

### DDA-20: Filter diorys by text in room

- Search input in navbar
- Show search results in grid
- Show search results in map
- Take a search result into focus

## 0.3.4 (April 9, 2020)

### DDA-17: Add room to home

* Add room -tool for connector
* Tool button refactoring
* Use path to save room

## 0.3.3 (April 5, 2020)

### DDA-6: Generate diograph from folders and subfolders

* Create recursive diograph generator
    - [x] Create diorys from folders, subfolders, files and photos
    - [x] Convert Jasmine tests to Jest tests => use Jest also for backend testing
    - [ ] Resolve data from photos to folders
        - [x] Folder image from first image

## 0.3.2 (March 27, 2020)

### Add linter and github actions

* Setup eslint rules and plugins
    * Airbnb
    * Prettier
* Setup github actions

## 0.3.1 (March 15, 2020)

### DDA-11: Create connector feature

* Restructure hooks and add connector feature

## 0.3.0 (February 25, 2020)

### Folder reader

* Read folder and generate diograph

## 0.2.1 (January 3, 2020)

### Map lens

* Add, move and remove locations on map

## 0.2.0 (December 30, 2019)

### Map lens

* Create map lens with navigation

## 0.1.0 (December 18, 2019)

### Initialize project

* Electron and create-react-app with channels
* Store, reducer and actions with hooks
* Feature based project structure

### Home

* Home with rooms

### Room

* Room with diograph
* Diory to focus

### Navigation

* Home, backward and forward navigation
* Left and right navigation

### Focus
* Show diory with linked diorys

### Path
* Show path from home

### Channels
- Get data from node backend
