
## 3.1.1 (May 6, 2021)

### DDA-135: Keyboard shortcuts
- Browse diories with arrow keys in fullscreen lens
- useKeyPress helper for future keyboard shortcuts

### DDA-130: Improve hand tool
- Add diory to hand when Diory is set in focus or is created
- Clicking diory in hand sets it in focus
- Don't hide diories / scroll handbar before it is full
- Feature tests for hand tool + checking store improved

### DDA-126: Render DataAwareDiory content based on MIME type
- DataAwareDiory renders image, video, website, document & 'open in external application' based on MIME type
- Fullscreen lens renders DataAwareDiory
- DioryActions component for focus diory actions for update-delete-hand tools & reveal in finder (using hand and folder icons)
- Remove video attribute & BackgroundVideo component
- FocusDioryContainer & LinkDioryContainer

### DDA-122: Grid with large focus diory
- Show focus diory almost fullscreen in grid
- Use DataAwareDiory as focus diory

### DDA-118: Start using schemas in diograph
- Add schemas to diory.data attribute when generating diograph
- Resolve mime type instead of detecting file extensions
- Use only absolute urls in diograph format
- Integration tests for generateDioryFromFile
- Improved development content

### DDA-103: Delete tool improvements
- Removes also reverse links of the deleted diory
- Confirmation dialog for delete tool
  - Lists all diories and links which are going to be deleted
- Delete link to self
- Leave delete tool active after deleting
- DeleteView, storybook, feature tests, unit tests...

### Other
- Feature tests can check store state
- Rename buttons reducers with SET_ -prefix (openButtons, activateButtons, inactivateButtons)
- Stricter linting rules
- Remove jsdocs as they haven't been actively updated

## 2.5.7 (March 14, 2021)

### DDA-85: Update folder
- Generate diories from newly added files and folder from diograph folder without removing already existing diograph.json
- Always read existing diograph.json and the diograph folder folder structure. Compare them and add all the diories that didn't already exist in diograph.json
- Update folder may duplicate diories if their links are added or removed
- generateDiograph refactored with better naming and structure

### DDA-83: Filters
- Set filter active and inactive individually
- Filter diorys when filter is active
- Change filtering criteria when filter is active

### DDA-60: Upgrade packages
- React-scripts 4.0.3, Electron 11.2, Node 12.18.3, React 17.0.1
- All the others packages also to the latest versions by January 23

### Other
- Complete fileTypes / file extensions for file-reader (image, audio, video, text)
- BUG: Ignore hidden files when generating diograph
- BUG: Map saved locations as string
- BUG: Timeline crashed if no diories with dates
- Diory in focus has "action area" (BackgroundDiory Heading as draggable)
- BUG: Navigate sideways icon didn't show
- Strictened linting rules

### Tests
- Testcafe E2E tests to CI pipeline (Appveyor)
- E2E tests to test GENERATE_DIOGRAPH, SAVE_ROOM and SAVE_HOME channels
- Snapshot tests for compareAndMergeDiographs (generateDiograph test pending for relative paths)
- Expose diograph state from Store to Cypress
- Improve feature tests for timeline, delete tool, update tool and create tool


## 2.3.5 (Feburary 4, 2021)

### DDA-60: Verify room connection
- Refactor and test coverage for channels
- Pass error from backend to frontend and invoke an alert
- Alert if some room's path doesn't exist

### POC: Testcafe
- Testcafe up & running with TESTCAFE_TEST env
- First E2E test which selects diograph folder and verifies that it gets loaded
- Take screenshots
- Run as a part of ./package-mac-common.sh

### Other
- Upgrade packages: Electron 11.2, Node 12.18, React 17, React-scripts 4


## 2.3.0 (January 19, 2021)

### DDA-81 Hand tool for linking diorys in grid lens
- Take linked diory to hand
- View diorys in hand
- Link diory from hand to focus diory
- Link diory from hand to linked diory
- Link linked diory to other linked diory

## 2.2.0 (January 8, 2021)

### DDA-67 Feature tests for all the existing features
- Create diory to map and timeline
- Move diory on map
- Timeline lens
- Update and create diory
- Delete diory

### UX
- Autofocus to text field in update diory
- Dialog done on enter key
- Ignore outside dialog click

## 2.1.1 (November 19, 2020)

### DDA-65 Migrate from Cucumber to Cypress
- `yarn cypress run` is run via Github Action (and `yarn cucumber` is removed)
- New development content is now used also with tests + convert tests
- cucumber-js and all the related stuff is removed
- Cypress is set up with example specs and first step definitions
- cypress-cucumber-preprocessor setup
- cypress-react-selector was setup but didn't update virtual DOM as expected
- room.feature and navigation.feature as first tests

### DDA-67 Feature tests for all the existing features
- Update and create tools
- Search
- Map lens
- Update Cypress to 5.6.0

## 2.1.0 (November 19, 2020)

### DDA-69: Timeline and fullscreen lenses and tools for lenses
- Create timeline lens
- Create fullscreen lens
- Create create, move, edit and move tools for timeline and map
- Refactor lens, tool, button and app structure
- Generate location data

# 2.0.0 (October 6, 2020)
- `yarn build` and `yarn test-electron` are run via Github Action

### DDA-39 App packaging and publishing automation
- package-mac.sh script to build new .dmg and upload it to S3
- AWS CodePipeline to create .exe and update the new versions to the website
- Apple's notarization flow with certificates

### DDA-41: Video-reader and videos to test content
- Initial video-reader to make diories from video files
- Video player for video diories
- Two videos to test content
- `video` attribute for diories (temporary solution)

## 1.2.0 (September 9, 2020)

### DDA-55 Refactor connectors for IPFS
- Refactor connectors feature to support several connectors.
- Refactor button structure for reusability

### DDA-53 Create add tool

### DDA-47 Create edit tool

## 1.1.1 (July 18, 2020)

### DDA-46: Storybook
- Set up storybook
- Create Modal and TextInput components

## 1.1.0 (July 18, 2020)

### DDA-45: Fullscreen view
- Create fullscreen button to navigation
- Add fullscreen state to navigation
- Create fullscreen view

# 1.0.0 (June 20, 2020)

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
