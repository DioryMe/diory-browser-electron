# Testing Findings

Add your findings below as you test the app. Use any format that works for you —
bullet points, descriptions, screenshots references, whatever is natural.

I'll turn these into structured requirements once you're done (or as you go).

---

## Findings

<!-- Add your findings here -->


## Finding 1: DioryGrid sorting
DioryGrid should sort diories by name (if it exists), then by date as a secondary sort.


---

## Requirement derived from Finding 1

**REQ-001: Sort diories in DioryGrid by sort key (`text ?? date`)**

- Memories displayed in `DiorysGrid` must be sorted before rendering
- Sort key per diory: `diory.text` if it exists, otherwise `diory.date`
- Single unified ascending string sort — no separate buckets
- Because dates are ISO format (`YYYY-MM-DD`), date-prefixed text like `"2025-12-04 Huu"` naturally sorts correctly alongside pure date strings
- Diories with neither `text` nor `date` appear last (stable, original order preserved)
- Sorting should be applied in `getLinkedDiories` (or a dedicated `sortDiories` utility called from `getStoryDiories`) so all consumers of memories get consistent ordering
- The `DiorysGrid` component itself remains a pure presentational component — no sorting logic inside it

**Affected files**:
- `src/react/features/diograph/utils/getLinkedDiories.js` — apply sort here, or extract to `sortDiories.js`
- `src/react/features/diograph/utils/getStoryDiories.js` — if sort utility is extracted


---

## Finding 2: Parent diory image inheritance

**REQ-002: Parent diories without an image should inherit image from first child that has one**

- When generating a diograph, if a parent diory has no image (or only a default color image), it should be updated with the image from its first child diory that has a real image
- This ensures folder-level diories display meaningful thumbnails in the grid
- **Implementation note**: This belongs in the folder-generator repo (diograph generation pipeline), not in diory-browser-electron
- diory-browser-electron has no action required for this requirement — it is tracked here for completeness


---

## Finding 3: Home stored in backend storage

**REQ-003: Store full home object in backend storage, not just address**

**Current behaviour**:
- Only `homeAddress` (a string path) is persisted in `electron-store` via `electron/lib/getHomeAddress.js` and `saveHomeAddress.js`
- On startup, the address is read from `electron-store`, then `getDiograph(homeAddress)` fetches the diograph separately

**Required behaviour**:
- The full home object (address + diograph data) should be stored in and retrieved from the backend storage (`@diograph/local-client` / `DioryClient`)
- `electron-store` should no longer be the source of truth for home
- `GET_HOME_ADDRESS` and `SAVE_HOME_ADDRESS` channels (and their electron/lib handlers) need to be replaced or extended to read/write from the backend store

**Affected files**:
- `electron/lib/getHomeAddress.js` — replace electron-store read with backend store read
- `electron/lib/saveHomeAddress.js` — replace electron-store write with backend store write
- `electron/lib/utils.js` — `settingsStore` may no longer be needed
- `src/shared/constants.js` — channel names may change
- `src/react/features/home/homeActions.js` — update `getHomeAddress` / `saveHomeAddress` thunks
- `src/react/features/home/useGetHomeEffect.js` — may simplify if home data comes pre-loaded


---

## Finding 4: Home should not use DiographClient

**REQ-004: Home data fetching should bypass DiographClient**

**Current behaviour**:
- After loading `homeAddress` from `electron-store`, `useGetHomeEffect` dispatches `getDiograph(homeAddress)` which goes through `DioryClient` → `LocalClient`

**Required behaviour**:
- Once REQ-003 is implemented (home stored in backend storage), home data should be fetched directly from the backend store — not via `DiographClient`
- `DiographClient` is for browsing diographs; home is a configuration concern and should have its own dedicated storage/retrieval path
- `useGetHomeEffect` should no longer call `getDiograph` for the home address

**Depends on**: REQ-003

**Affected files**:
- `src/react/features/home/useGetHomeEffect.js` — remove `getDiograph(homeAddress)` call
- `src/react/features/home/homeActions.js` — home thunks should not use `diographClient`
- `src/react/store/StoreProvider.js` — home may not need `diographClient` injected for its operations

