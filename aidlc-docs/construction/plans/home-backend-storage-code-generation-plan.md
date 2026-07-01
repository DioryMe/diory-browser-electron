# Code Generation Plan — home-backend-storage

## Context

**Requirements**: REQ-003 + REQ-004
**Scope**: Store the full home diograph object in `settingsStore` instead of just the address string. Rename `getHomeAddress` → `getHomeDiograph` throughout. Remove `DiographClient` from the home fetching path.

**Current state** (partially in progress):
- `homeActionTypes.js` already has `GET_HOME_DIOGRAPH` + `getHomeDiographActions`
- `homeActions.js` already has `getHomeDiograph` thunk — but still uses `diographClient`
- `getHomeAddress` channel + electron lib store only `homeAddress` string in `settingsStore`
- `useGetHomeEffect` still calls `getHomeAddress()` (old path)

**Target flow**:
```
settingsStore (stores full home diograph object, not just address)
  -> GET_HOME_DIOGRAPH channel (renamed from GET_HOME_DIOGRAPH)
  -> getHomeDiograph() thunk (no diographClient — data comes from settingsStore)
  -> home state set in Redux (address + diograph)
  -> useGenerateDiographEffect reacts to address change (unchanged)
```

**Key change**: `settingsStore` key `homeAddress` (string) → `homeDiograph` (object `{ diograph }`)
Address is derived from the diograph, not stored separately.

---

## Steps

- [ ] **Step 1 — Spec: `getHomeDiograph` electron lib**
  Rename `electron/lib/getHomeAddress.spec.js` → `electron/lib/getHomeDiograph.spec.js`.
  - Keep `settingsStore` mock
  - Test: returns `{ address, diograph }` when home diograph stored
  - Test: returns `{ address: undefined }` when nothing stored

- [ ] **Step 2 — Spec: `saveHomeDiograph` electron lib**
  Rename `electron/lib/saveHomeAddress.spec.js` (currently no spec) → `electron/lib/saveHomeDiograph.spec.js`.
  - Keep `settingsStore` mock
  - Test: saves `{ diograph }` under key `homeDiograph` and returns it

- [ ] **Step 3 — Impl: rename `electron/lib/getHomeAddress.js` → `getHomeDiograph.js`**
  - Change `settingsStore().get('homeAddress')` → `settingsStore().get('homeDiograph')`
  - Return `{ address, diograph }` instead of `{ address }`
  - Update validity check: use `address` from the stored object for `fs.existsSync`
  - Export as `getHomeDiograph`

- [ ] **Step 4 — Impl: rename `electron/lib/saveHomeAddress.js` → `saveHomeDiograph.js`**
  - Change `settingsStore().set('homeAddress', address)` → `settingsStore().set('homeDiograph', { diograph })`
  - Accept `{ diograph }` as parameter instead of `{ address }`
  - Export as `saveHomeDiograph`

- [ ] **Step 5 — Impl: `src/shared/constants.js`**
  - Rename channel `GET_HOME_DIOGRAPH` → `GET_HOME_DIOGRAPH`
  - Rename channel `SAVE_HOME_ADDRESS` → `SAVE_HOME_DIOGRAPH`

- [ ] **Step 6 — Impl: `electron/preload.js`**
  - Replace `require('./lib/getHomeAddress')` → `require('./lib/getHomeDiograph')`
  - Replace `require('./lib/saveHomeAddress')` → `require('./lib/saveHomeDiograph')`
  - Update channel bindings to use `GET_HOME_DIOGRAPH` and `SAVE_HOME_DIOGRAPH`

- [ ] **Step 7 — Impl: `src/react/features/home/homeActions.js`**
  - Remove `getHomeAddress` and `saveHomeAddress` thunks
  - Update `getHomeDiograph` thunk: use `invokeChannel(channels.GET_HOME_DIOGRAPH)` instead of `diographClient`
  - Add `saveHomeDiograph` thunk: use `invokeChannel(channels.SAVE_HOME_DIOGRAPH, { diograph })`

- [ ] **Step 8 — Impl: `src/react/features/home/homeActionTypes.js`**
  - Remove `GET_HOME_DIOGRAPH`, `SAVE_HOME_ADDRESS`, `getHomeAddressActions`, `saveHomeAddressActions`
  - Add `SAVE_HOME_DIOGRAPH` and `saveHomeDiographActions`

- [ ] **Step 9 — Impl: `src/react/features/home/homeReducer.js`**
  - Remove `GET_HOME_DIOGRAPH` and `SAVE_HOME_ADDRESS` reducer entries
  - Add `SAVE_HOME_DIOGRAPH` reducer entry
  - Ensure `GET_HOME_DIOGRAPH` success reducer sets `diograph` (address derived from it)

- [ ] **Step 10 — Impl: `src/react/features/home/useGetHomeEffect.js`**
  - Replace `getHomeAddress()` dispatch → `getHomeDiograph()`
  - Remove `getDiograph(homeAddress)` dispatch (REQ-004 — diograph now comes from settingsStore)

- [ ] **Step 11 — Impl: `src/react/client/client.mock.js` + mock response**
  - Rename mock import `GET_HOME_DIOGRAPH` → `GET_HOME_DIOGRAPH`
  - Rename `src/react/client/mockResponses/GET_HOME_DIOGRAPH.json` → `GET_HOME_DIOGRAPH.json`
  - Update mock response to `{ diograph: {} }`

- [ ] **Step 12 — Impl: `src/react/features/home/utils/useSaveHomeAddress.js`**
  - Rename to `useSaveHomeDiograph.js`
  - Update to dispatch `saveHomeDiograph({ diograph })` instead of `saveHomeAddress(address)`

- [ ] **Step 12 — Verify: run tests**
  Run `yarn test-electron` and `yarn test-react` to confirm all specs pass.

---

## Files modified / renamed
| File | Action |
|------|--------|
| `electron/lib/getHomeAddress.spec.js` | Rename → `getHomeDiograph.spec.js` + rewrite |
| `electron/lib/saveHomeAddress.spec.js` | Create as `saveHomeDiograph.spec.js` |
| `electron/lib/getHomeAddress.js` | Rename → `getHomeDiograph.js` + rewrite |
| `electron/lib/saveHomeAddress.js` | Rename → `saveHomeDiograph.js` + rewrite |
| `src/shared/constants.js` | Modify (rename both channels) |
| `electron/preload.js` | Modify |
| `src/react/features/home/homeActions.js` | Modify |
| `src/react/features/home/homeActionTypes.js` | Modify |
| `src/react/features/home/homeReducer.js` | Modify |
| `src/react/features/home/useGetHomeEffect.js` | Modify |
| `src/react/features/home/utils/useSaveHomeAddress.js` | Rename → `useSaveHomeDiograph.js` + rewrite |
| `src/react/client/client.mock.js` | Modify |
| `src/react/client/mockResponses/GET_HOME_DIOGRAPH.json` | Rename → `GET_HOME_DIOGRAPH.json` |

## Files NOT changed
- `electron/lib/utils.js` — `settingsStore` still used
- `src/react/store/StoreProvider.js` — `diographClient` still needed for diograph browsing

## Context

**Requirements**: REQ-003 + REQ-004
**Scope**: Replace `electron-store` as home storage with the backend store (`LocalClient`). Rename `getHomeAddress` → `getHomeDiograph` throughout. Remove `DiographClient` from the home fetching path.

**Current state** (partially in progress):
- `homeActionTypes.js` already has `GET_HOME_DIOGRAPH` + `getHomeDiographActions`
- `homeActions.js` already has `getHomeDiograph` thunk — but still uses `diographClient`
- `getHomeAddress` channel + electron lib still use `electron-store`
- `useGetHomeEffect` still calls `getHomeAddress()` (old path)

**Target flow**:
```
LocalClient (backend store)
  -> GET_HOME_DIOGRAPH channel (renamed from GET_HOME_DIOGRAPH)
  -> getHomeDiograph() thunk (no diographClient)
  -> home.address set in Redux
  -> useGenerateDiographEffect reacts to address change (unchanged)
```

---

## Steps

- [ ] **Step 1 — Spec: `getHomeDiograph` electron lib**
  Rename `electron/lib/getHomeAddress.spec.js` → `electron/lib/getHomeDiograph.spec.js`.
  - Remove `settingsStore` mock, replace with `localClient` mock
  - Test: returns `{ address }` when home stored in backend
  - Test: returns `{ address: undefined }` when nothing stored

- [ ] **Step 2 — Spec: `saveHomeAddress` electron lib**
  Create `electron/lib/saveHomeAddress.spec.js` (currently no spec).
  - Mock `localClient`
  - Test: saves address and returns `{ address }`

- [ ] **Step 3 — Impl: rename `electron/lib/getHomeAddress.js` → `getHomeDiograph.js`**
  - Replace `settingsStore().get('homeAddress')` with read from `localClient` backend store
  - Export as `getHomeDiograph`

- [ ] **Step 4 — Impl: `electron/lib/saveHomeAddress.js`**
  - Replace `settingsStore().set(...)` with write to `localClient` backend store

- [ ] **Step 5 — Impl: `electron/lib/utils.js`**
  - Remove `settingsStore` if no longer referenced

- [ ] **Step 6 — Impl: `src/shared/constants.js`**
  - Rename channel `GET_HOME_ADDRESS` → `GET_HOME_DIOGRAPH`

- [ ] **Step 7 — Impl: `electron/preload.js`**
  - Replace `require('./lib/getHomeAddress')` with `require('./lib/getHomeDiograph')`
  - Update channel binding: `[channels.GET_HOME_DIOGRAPH]: (params) => channelLogger(getHomeDiograph, params)`

- [ ] **Step 8 — Impl: `src/react/features/home/homeActions.js`**
  - Remove `getHomeAddress` thunk (replaced by `getHomeDiograph`)
  - Update `getHomeDiograph` thunk to use `invokeChannel(channels.GET_HOME_DIOGRAPH)` instead of `diographClient`
  - Remove `diographClient` dependency from home thunks entirely

- [ ] **Step 9 — Impl: `src/react/features/home/homeActionTypes.js`**
  - Remove `GET_HOME_ADDRESS` and `getHomeAddressActions` (no longer needed)

- [ ] **Step 10 — Impl: `src/react/features/home/homeReducer.js`**
  - Remove `GET_HOME_ADDRESS` reducer entry
  - Ensure `GET_HOME_DIOGRAPH` reducer entry is correct

- [ ] **Step 11 — Impl: `src/react/features/home/useGetHomeEffect.js`**
  - Replace `getHomeAddress()` dispatch with `getHomeDiograph()`
  - Remove `getDiograph(homeAddress)` dispatch (REQ-004)

- [ ] **Step 12 — Impl: `src/react/client/client.mock.js` + mock response**
  - Rename `GET_HOME_ADDRESS` mock import → `GET_HOME_DIOGRAPH`
  - Rename `src/react/client/mockResponses/GET_HOME_ADDRESS.json` → `GET_HOME_DIOGRAPH.json`

- [ ] **Step 13 — Verify: run tests**
  Run `yarn test-electron` and `yarn test-react` to confirm all specs pass.

---

## Files modified / renamed
| File | Action |
|------|--------|
| `electron/lib/getHomeAddress.spec.js` | Rename → `getHomeDiograph.spec.js` + rewrite |
| `electron/lib/saveHomeAddress.spec.js` | Create |
| `electron/lib/getHomeAddress.js` | Rename → `getHomeDiograph.js` + rewrite |
| `electron/lib/saveHomeAddress.js` | Modify |
| `electron/lib/utils.js` | Modify (remove settingsStore) |
| `src/shared/constants.js` | Modify (rename channel) |
| `electron/preload.js` | Modify |
| `src/react/features/home/homeActions.js` | Modify |
| `src/react/features/home/homeActionTypes.js` | Modify |
| `src/react/features/home/homeReducer.js` | Modify |
| `src/react/features/home/useGetHomeEffect.js` | Modify |
| `src/react/client/client.mock.js` | Modify |
| `src/react/client/mockResponses/GET_HOME_ADDRESS.json` | Rename → `GET_HOME_DIOGRAPH.json` |

## Context

**Requirements**: REQ-003 + REQ-004
**Scope**: Replace `electron-store` as the home address storage with the backend store (`LocalClient`). Remove `DiographClient` from the home data fetching path.

**Current flow**:
```
electron-store (config.json)
  -> GET_HOME_ADDRESS channel -> homeActions.getHomeAddress()
  -> setDiographAddress(homeAddress)
  -> getDiograph(homeAddress)  [uses DiographClient]
```

**Target flow**:
```
LocalClient / backend store
  -> GET_HOME_ADDRESS channel -> homeActions.getHomeAddress()
  -> setDiographAddress(homeAddress)
  [getDiograph no longer called from home — diograph loading stays in useGenerateDiographEffect]
```

---

## Steps

- [ ] **Step 1 — Spec: `getHomeAddress`**
  Update `electron/lib/getHomeAddress.spec.js` to reflect reading from `LocalClient` instead of `electron-store`.
  - Remove `settingsStore` mock
  - Add `localClient` / backend store mock
  - Keep existing test case: returns `{ address }`
  - Add test case: returns `{ address: undefined }` when no home stored

- [ ] **Step 2 — Spec: `saveHomeAddress`**
  Create `electron/lib/saveHomeAddress.spec.js` (currently no spec exists).
  - Mock `localClient` / backend store
  - Test case: saves address and returns `{ address }`

- [ ] **Step 3 — Impl: `electron/lib/getHomeAddress.js`**
  Replace `settingsStore().get('homeAddress')` with a read from the backend store via `localClient`.

- [ ] **Step 4 — Impl: `electron/lib/saveHomeAddress.js`**
  Replace `settingsStore().set('homeAddress', address)` with a write to the backend store via `localClient`.

- [ ] **Step 5 — Impl: `electron/lib/utils.js`**
  Remove `settingsStore` if no longer used elsewhere. Keep `directoryExists`.

- [ ] **Step 6 — Impl: `src/react/features/home/useGetHomeEffect.js`**
  Remove the `getDiograph(homeAddress)` dispatch. Home effect should only load the address — diograph loading is already handled by `useGenerateDiographEffect` reacting to `diograph.address` changing.

- [ ] **Step 7 — Verify: run existing tests**
  Run `yarn test-electron` to confirm electron lib specs pass.
  Run `yarn test-react` to confirm React specs pass.

---

## Files modified
| File | Action |
|------|--------|
| `electron/lib/getHomeAddress.spec.js` | Modify |
| `electron/lib/saveHomeAddress.spec.js` | Create |
| `electron/lib/getHomeAddress.js` | Modify |
| `electron/lib/saveHomeAddress.js` | Modify |
| `electron/lib/utils.js` | Modify (remove settingsStore if unused) |
| `src/react/features/home/useGetHomeEffect.js` | Modify |

## Files NOT changed
- `src/shared/constants.js` — channel names stay the same
- `src/react/features/home/homeActions.js` — thunk logic unchanged
- `src/react/store/StoreProvider.js` — `diographClient` still needed for diograph browsing
- `electron/preload.js` — channel wiring unchanged
