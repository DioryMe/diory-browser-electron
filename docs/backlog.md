# Backlog

Known follow-ups and small issues not yet acted on. Not a spec — just a running list; remove items once done, don't let them accumulate as permanent documentation.

## Technical improvement

1. move `createDiory` out from components (e.g. `Favorites.js:12`, `Lenses.js:14-17`, `Hand.js:16`, called directly in render body) — initiate well-known diories in `useInitiateDiographEffect` instead, not per-component
2. component interfaces to `{ key, diograph }`
3. make the hardcoded `favorites`/`timeline`/`map`/`graph`/`search`/`hand` diories real diories persisted in the folder's own diograph
4. make components independent of the store (e.g. `Favorites.js`, `Lenses`, `Hand` currently take `createDiory` from the store via `Browser.js`/`useDiograph` — should be pure, per `AGENTS.md`'s "pure components, no direct store access" convention)

## Select diories from folders

1. As a user, when I use the take-to-diory toggle, I want it to also add a link from that diory's month diory to the diory (creating the month diory and its parent timeline diories if they don't exist yet), in addition to adding the diory to Diory.

## Create stories to Diory

## Browse stories in Diory