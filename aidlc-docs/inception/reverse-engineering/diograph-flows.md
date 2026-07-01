# Diograph Flows — generateDiograph & getDiograph

## What triggers each function

**getDiograph** — called once when the app loads a home address for the first time:
```
app start → home address loaded from electron-store → getDiograph(homeAddress)
```

**generateDiograph** — called every time the user navigates to a different folder:
```
user navigates to a diory → storyKey changes → generateDiograph(address, path)
```

---

## Client Setup

`DioryClient` is instantiated once in `StoreProvider` and injected into every Redux thunk
as the third argument `{ diographClient }`:

```
StoreProvider
  -> new DioryClient([window.localClient])   // window.localClient exposed via contextBridge
  -> applyMiddleware(thunk.withExtraArgument({ diographClient }))
```

`window.localClient` is a `LocalClient` instance from `@diograph/local-client`, exposed to
the renderer via `contextBridge` in `electron/preload.js`.

---

## getDiograph Flow

**Purpose**: Load an already-generated `diograph.json` from a folder address.

**Trigger**: `useGetHomeEffect` — fires when `home.address` becomes available.

```
useGetHomeEffect (src/react/features/home/useGetHomeEffect.js)
  |
  |-- dispatch(getHomeAddress())
  |     -> invokeChannel(GET_HOME_ADDRESS)
  |     -> channelsApi.GET_HOME_ADDRESS()  [contextBridge]
  |     -> getHomeAddress() in electron/lib/getHomeAddress.js
  |     -> reads address from electron-store config.json
  |     -> dispatches GET_HOME_ADDRESS_SUCCESS { address }
  |     -> home.address set in Redux
  |
  |-- dispatch(setDiographAddress(homeAddress))
  |     -> SET_DIOGRAPH_ADDRESS action
  |     -> diograph.address = homeAddress, diograph.diograph = {} (reset)
  |
  +-- dispatch(getDiograph(homeAddress))
        -> diographActions.getDiograph(address)
        -> guards: skip if already loading[address] or loaded[address]
        -> dispatches GET_DIOGRAPH_BEGIN { address }
           -> diograph.loading[address] = true
        -> await diographClient.fetchDiograph(address)
           -> DioryClient -> LocalClient -> reads diograph.json from disk
        -> dispatch(updateDiograph(address))
           -> diographClient.getDiograph(address).toObject()
           -> dispatches UPDATE_DIOGRAPH { diograph, address }
           -> diograph.diograph = { [id]: diory, ... }
        -> dispatches GET_DIOGRAPH_SUCCESS { address }
           -> diograph.loading[address] = false
           -> diograph.loaded[address] = true
```

---

## generateDiograph Flow

**Purpose**: Scan a folder on disk, build a diograph from its file structure, save
`diograph.json`, and load the result into Redux.

**Trigger**: `useGenerateDiographEffect` — fires whenever `diograph.address` or
`navigation.storyKey` changes (i.e. every time the user navigates to a new folder).

```
useGenerateDiographEffect (src/react/features/diograph/useGenerateDiographEffect.js)
  |
  |-- Derives `path` from storyKey:
  |     storyKey = "/some/folder/id"  ->  path = "/some/folder/"
  |     storyKey = undefined          ->  path = "/"
  |
  +-- dispatch(generateDiograph(address, path))
        -> diographActions.generateDiograph(root, path)
        -> address = root + path.slice(1)   // e.g. "/home/user/photos" + "some/folder/"
        -> guards: skip if loading[address]
        -> dispatches GENERATE_DIOGRAPH_BEGIN { address, path }
           -> diograph.loading[address] = true  (same reducer as GET_DIOGRAPH_BEGIN)
        -> await diographClient.generateDiograph(root, path, { saveDiograph })
           -> DioryClient -> LocalClient
           -> scans folder recursively
           -> creates diory for each file/subfolder
           -> saves diograph.json to disk (in production; skipped in development)
        -> dispatches GENERATE_DIOGRAPH_SUCCESS { address }
           -> diograph.loading[address] = false
           -> diograph.loaded[address] = true
        -> dispatch(updateDiograph(address))
           -> diographClient.getDiograph(address).toObject()
           -> dispatches UPDATE_DIOGRAPH { diograph, address }
           -> diograph.diograph = { [id]: diory, ... }
```

---

## Key Differences

| | getDiograph | generateDiograph |
|---|---|---|
| **Purpose** | Load existing diograph.json | Scan folder + build diograph |
| **Trigger** | Home address loaded | Address or storyKey changes |
| **Saves to disk** | No | Yes (production only) |
| **Guard condition** | Skip if loading or loaded | Skip if loading |
| **Client method** | `fetchDiograph(address)` | `generateDiograph(root, path, opts)` |
| **Redux actions** | GET_DIOGRAPH_BEGIN/SUCCESS/FAILURE | GENERATE_DIOGRAPH_BEGIN/SUCCESS/FAILURE |
| **Both end with** | `updateDiograph(address)` | `updateDiograph(address)` |

---

## Redux State After Either Flow

```
diograph: {
  address: "/home/user/photos/",   // set by setDiographAddress
  isDiory: false,
  diograph: {
    "/": { id: "/", text: "photos", image: "...", links: { ... } },
    "/abc123": { id: "abc123", text: "beach.jpg", image: "...", data: [...] },
    ...
  },
  loading: { "/home/user/photos/": false },
  loaded:  { "/home/user/photos/": true },
  error:   {},
}
```

---

## Data Flow Summary

```
Disk (diograph.json / folder)
  ^  v
LocalClient (@diograph/local-client)        [Node.js / Electron main, via contextBridge]
  ^  v
DioryClient (@diory/client-js)              [Renderer, injected into Redux thunk]
  ^  v
diographActions (getDiograph / generateDiograph)
  ^  v
Redux store (diograph slice)
  ^  v
React components (Diograph, DiographView, DiorysGrid)
```
