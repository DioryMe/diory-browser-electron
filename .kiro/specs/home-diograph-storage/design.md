# Design: Home Diograph Storage

## Overview

Store the full home diograph in `settingsStore`. Remove the separate Welcome component — Home always renders. On first run, a default home diograph is returned with a placeholder `diory` entry that prompts the user to select a root folder. Once selected, the diory gets its real address and the normal flow continues.

## Architecture

```
+------------------+       GET_HOME_DIOGRAPH       +-------------------+
|  settingsStore   | <---------------------------> |  electron/preload |
|  (homeDiograph)  |       SAVE_HOME_DIOGRAPH      |  (contextBridge)  |
+------------------+                               +-------------------+
                                                            |
                                                            v
                                                   +-------------------+
                                                   |  homeActions.js   |
                                                   |  useGetHomeEffect |
                                                   +-------------------+
                                                            |
                                          addDiograph('home', diograph)
                                                            v
                                                   +-------------------+
                                                   |  DiographClient   |
                                                   |  (in-memory only) |
                                                   +-------------------+
```

## Data Model

### Default Home Diograph (first run, nothing in settingsStore)

```json
{
  "diory": { "id": "diory", "text": "Welcome to Diory!\n\nClick to choose your Diory location.", "image": "diory-demo-content/Scouts BSA International/PIXNIO-53553-1782x1188.jpeg" },
  "folders": { "id": "folders" }
}
```

### Home Diograph (after root folder selected)

```json
{
  "diory": { "id": "diory", "text": "My Photos", "image": "...", "address": "LocalClient/path/to/root/" },
  "folders": { "id": "folders", "links": [{ "id": "LocalClient/path/to/folder1/" }] },
  "LocalClient/path/to/folder1/": { "id": "LocalClient/path/to/folder1/", "text": "folder1", "image": "..." }
}
```

### Redux State: `state.home`

```javascript
{
  diograph: { /* home diograph object */ },
  isHome: true,
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
}
```

## Key Design Decisions

1. **No Welcome component** — Home always renders. The "welcome" state is just a diograph entry without an address.
2. **Default diograph on first run** — `getHomeDiograph` electron lib returns a default when settingsStore has nothing stored.
3. **Address-based click behaviour** — When user clicks the story diory: if it has no `address`, open folder picker and assign it. If it has `address`, navigate into it normally.
4. **DiographClient used for mutations only** — The home diograph is loaded from settingsStore (not fetched via DiographClient), but DiographClient is used in-memory to add diories, add links, generate folder diographs, etc. before saving back.
5. **settingsStore is single source of truth** — Full diograph object stored under key `homeDiograph`.

## Components

### Electron Layer

| File | Responsibility |
|------|---------------|
| `getHomeDiograph.js` | Read `homeDiograph` from settingsStore. Return `{ diograph }` (may be undefined). |
| `saveHomeDiograph.js` | Write diograph to settingsStore under `homeDiograph` key |
| `preload.js` | Bind channels `GET_HOME_DIOGRAPH` and `SAVE_HOME_DIOGRAPH` |

### React Layer

| File | Responsibility |
|------|---------------|
| `homeActions.js` | `getHomeDiograph()` — fetch from settingsStore, register with DiographClient |
| | `saveHomeDiograph(diograph)` — save to settingsStore |
| | `addHomeFolder(address)` — generate folder, add to home, save |
| `homeReducer.js` | Store diograph in Redux on GET/SAVE success |
| `useGetHomeEffect.js` | On mount: dispatch `getHomeDiograph()` if no diograph loaded |
| `Home.js` | Renders HomeView. Story click handler: if no address → folder picker, else → navigate |
| `Root.js` | Simplified: no Welcome conditional, just Home or Browser based on `isHome` |

### Deleted

| File | Reason |
|------|--------|
| `Welcome.js` | No longer needed — Home handles both states |
| `useSaveHomeAddress.js` | Replaced by click handler logic in Home.js |

## Key Flows

### Flow 1: App Startup

```
useGetHomeEffect
  → dispatch(getHomeDiograph())
    → invokeChannel(GET_HOME_DIOGRAPH)
      → settingsStore().get('homeDiograph') || DEFAULT_DIOGRAPH
    → diographClient.addDiograph('home', diograph)
    → dispatch success
  → Home renders (either welcome placeholder or real content)
```

### Flow 2: First Run — User Clicks Story (no address)

```
Home.onStoryClick(diory)
  → diory has no address
  → open folder picker (getLocalAddress)
  → diographClient.generateDiograph(address)
  → update diory with address + generated content
  → save home diograph to settingsStore
  → Home re-renders with real diory
```

### Flow 3: Normal — User Clicks Story (has address)

```
Home.onStoryClick(diory)
  → diory.address exists (e.g. "LocalClient/path/to/folder/")
  → dispatch(setIsHome(false))
  → dispatch(setDiographAddress(diory.address, true))
  → Browser renders, useGenerateDiographEffect loads folder content
```

### Flow 4: Add Folder to Home

```
useAddFolderTool
  → dispatch(addHomeFolder(address))
    → generate folder diograph
    → add folder diory to home diograph
    → link from 'folders' diory
    → save to settingsStore
    → Home re-renders with new folder in grid
```

## Remaining Tasks

- [ ] Add default diograph fallback in `getHomeDiograph.js` (electron lib)
- [ ] Rename `getHomeAddress` → `getHomeDiograph` in homeActions.js + useGetHomeEffect.js
- [ ] Rename `saveHomeAddress` → `saveHomeDiograph` in homeActions.js
- [ ] Update `Home.js` onStoryClick: if no address → folder picker flow, else → navigate
- [ ] Delete `Welcome.js`
- [ ] Simplify `Root.js` — remove Welcome conditional
- [ ] Delete `useSaveHomeAddress.js`
- [ ] Update `client.mock.js` + rename mock response file
- [ ] Fix typo `{ id: 'folders '}` → `{ id: 'folders' }`
- [ ] Create `saveHomeDiograph.spec.js`
- [ ] End-to-end verification
