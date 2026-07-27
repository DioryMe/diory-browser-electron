# Backlog

Known follow-ups and small issues not yet acted on. Not a spec — just a running list; remove items once done, don't let them accumulate as permanent documentation.

1. refactor: move `createDiory` out from components (e.g. `Favorites.js:12`, `Lenses.js:14-17`, `Hand.js:16`, called directly in render body) — initiate well-known diories in `useInitiateDiographEffect` instead, not per-component
2. refactor: component interfaces to `{ key, diograph }`
3. refactor: make the hardcoded `favorites`/`timeline`/`map`/`graph`/`search`/`hand` diories real diories persisted in the folder's own diograph
4. refactor: make components independent of the store (e.g. `Favorites.js`, `Lenses`, `Hand` currently take `createDiory` from the store via `Browser.js`/`useDiograph` — should be pure, per `AGENTS.md`'s "pure components, no direct store access" convention)