# Requirements: Home Diograph Storage

## Summary

Store the full home diograph object in `settingsStore` instead of just an address string. The home feature should not use `DiographClient.fetchDiograph()` — it reads/writes its own diograph directly via IPC channels to `settingsStore`.

## Functional Requirements

- FR-1: Home diograph (including root diory, folders diory, and folder references) is persisted as a single object in `settingsStore` under the key `homeDiograph`
- FR-2: On app startup, the home diograph is loaded from `settingsStore` via `GET_HOME_DIOGRAPH` channel and placed into Redux `state.home.diograph`
- FR-3: The loaded home diograph is registered with `DiographClient` under the address `'home'` so it can be mutated via the client API
- FR-4: When the user selects a home folder for the first time, the folder diograph is generated, a home diograph structure is built (with `diory` and `folders` entries), and saved to `settingsStore` via `SAVE_HOME_DIOGRAPH` channel
- FR-5: When the user adds a folder to home, the folder's root diory is added to the home diograph and linked from the `folders` diory, then saved to `settingsStore`
- FR-6: The home screen displays the `diory` entry as the story and `folders` linked diories as memories
- FR-7: Clicking a folder memory navigates to that folder's diograph for browsing

## Non-Functional Requirements

- NFR-1: No network calls — all home data is local (settingsStore + file system)
- NFR-2: Home loading should not block on `DiographClient.fetchDiograph()` — it reads directly from settingsStore (fast)
