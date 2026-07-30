# Backlog

Known follow-ups and small issues not yet acted on. Not a spec — just a running list; remove items once done, don't let them accumulate as permanent documentation.

## diory-browser-electron

### Technical improvement

1. move `createDiory` out from components (e.g. `Favorites.js:12`, `Lenses.js:14-17`, `Hand.js:16`, called directly in render body) — initiate well-known diories in `useInitiateDiographEffect` instead, not per-component
2. component interfaces to `{ key, diograph }`
3. make the hardcoded `favorites`/`timeline`/`map`/`graph`/`search`/`hand` diories real diories persisted in the folder's own diograph
4. make components independent of the store (e.g. `Favorites.js`, `Lenses`, `Hand` currently take `createDiory` from the store via `Browser.js`/`useDiograph` — should be pure, per `AGENTS.md`'s "pure components, no direct store access" convention)
5. add a display-image fallback used wherever a diory's image is shown: `this.image || findImage(linkedDiories) || getDefaultImage()` — try the diory's own image, then a linked diory's image, then the random placeholder color. Belongs in this app (not `@diograph/diograph` — resolving links needs diograph context a single `Diory` instance doesn't have), likely extending `getDefaultImage.js`. See `@diograph/folder-generator` section below for the related root cause of folder diories not getting a real image from their contents.

### Select diories from folders

### Create stories to Diory

### Browse stories in Diory

1. add day-level period sub-headers within the timeline lens, shown between diories to visually group them by day (the year/month title rows already exist, e.g. "2026-07 (8)"). Nested under it, day sub-headers with a count, e.g.:
   ```
   2026-07 (8)
     2026-07-02 (4)
       - diory1...4
     2026-07-03 (4)
       - diory5...8
   ```
   Under every period (year/month/day), show at most a random 10 diories, not the full list — keeps each level scannable regardless of how many diories it actually contains.

## @diograph/diograph

## @diograph/folder-generator

1. stop storing a random placeholder into a folder diory's `image` at generation time (`generateFolderDiory`) — leave it `undefined` when no real image is found directly in the folder, so "no image" is honestly represented in the data instead of faked.
2. root cause of folder tiles never getting a real image from their contents: `updateFolderDiory` (`updateFolderDiories/folderDiory/index.js:11`) does `diory.image ?? getImage(linkedDiories)` — but `diory.image` is already always set (to a placeholder) by generation time, so this fallback to the folder's linked diories' images never actually runs. Fixed automatically once item 1 above lands (image stays genuinely `undefined` until resolved); until then, could also be patched narrowly by checking `isDefaultImage(diory.image)` instead of definedness.