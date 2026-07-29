# Backlog

Known follow-ups and small issues not yet acted on. Not a spec — just a running list; remove items once done, don't let them accumulate as permanent documentation.

## diory-browser-electron

### Technical improvement

1. move `createDiory` out from components (e.g. `Favorites.js:12`, `Lenses.js:14-17`, `Hand.js:16`, called directly in render body) — initiate well-known diories in `useInitiateDiographEffect` instead, not per-component
2. component interfaces to `{ key, diograph }`
3. make the hardcoded `favorites`/`timeline`/`map`/`graph`/`search`/`hand` diories real diories persisted in the folder's own diograph
4. make components independent of the store (e.g. `Favorites.js`, `Lenses`, `Hand` currently take `createDiory` from the store via `Browser.js`/`useDiograph` — should be pure, per `AGENTS.md`'s "pure components, no direct store access" convention)
5. once folder diories stop storing a placeholder image (see `@diograph/diograph` and `@diograph/folder-generator` sections below), read/display code here should rely on the shared default-image fallback instead of `getDefaultImage.js`'s own copy — drop the duplicate once the model-level one exists.

### Select diories from folders

### Create stories to Diory

### Browse stories in Diory

## @diograph/diograph

1. add a `displayImage` getter (or similar) to the `Diory` class — `this.image || getDefaultImage()` — so every consumer (this app, `@diograph/folder-generator`, anything else built on this model) gets a correct placeholder-or-real image without reimplementing the fallback. Centralizes the 3x-duplicated placeholder-color logic (this app's `getDefaultImage.js`, `folder-generator`'s `generateDiories/folderDiory/image.js` and `updateFolderDiories/folderDiory/image.js`).
2. move the year/month/timeline-linking logic currently in `homeActions.js`'s `linkToMonthDiory` (create year + month diories if missing, link timeline → year → month → diory) into the model itself, e.g. a `Diograph.addDioryToTimeline(diory)` method — so any consumer gets correct period-hierarchy linking without reimplementing it in app code. Note: `Diograph.getDiory` still throws if not found (unchanged) — only `Diory.addLink`/`removeLink` and `Diograph.removeDiory` were made idempotent so far (fixed in `0.5.0-rc1`).

## @diograph/folder-generator

1. stop storing a random placeholder into a folder diory's `image` at generation time (`generateFolderDiory`) — leave it `undefined` when no real image is found directly in the folder, so "no image" is honestly represented in the data instead of faked.
2. root cause of folder tiles never getting a real image from their contents: `updateFolderDiory` (`updateFolderDiories/folderDiory/index.js:11`) does `diory.image ?? getImage(linkedDiories)` — but `diory.image` is already always set (to a placeholder) by generation time, so this fallback to the folder's linked diories' images never actually runs. Fixed automatically once item 1 above lands (image stays genuinely `undefined` until resolved); until then, could also be patched narrowly by checking `isDefaultImage(diory.image)` instead of definedness.