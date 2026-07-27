# High-level app flow

Snapshot as of 2026-07-27 — re-derive from code if this looks stale, don't trust it blindly (see `AGENTS.md`).

```mermaid
flowchart TB
    subgraph Electron["Electron Main Process"]
        Main["electron-main.js"]
        Preload["electron/preload.js<br/>(IPC channel bridge)"]
        Lib["electron/lib/*.js<br/>(getHomeDiograph, saveHomeDiograph,<br/>show-open-dialog, utils)"]
        Store["electron-store<br/>(settingsStore, on disk)"]
        FS["User's filesystem<br/>(diory folders + diograph.json files)"]
    end

    subgraph React["React / Redux App"]
        Boot["StoreProvider<br/>(creates DioryClient, injected as thunk extra)"]
        HomeF["Home feature<br/>(homeActions/Reducer)"]
        DiographF["Diograph feature<br/>(diographActions/Reducer)<br/>+ Lenses (map/timeline/graph/search/folder)"]
        Tools["Tools feature<br/>(create/update/delete diory & links, add folder)"]
        SidePanel["SidePanel + Navigation<br/>(selection/story state)"]
    end

    subgraph Client["@diory/client-js"]
        DioryClient["DioryClient<br/>(generateDiograph, fetchDiograph, getDiograph)"]
        Diograph["Diograph / Diory instances<br/>(in-memory, debounced auto-save)"]
    end

    Main --> Boot
    Boot --> Preload
    Preload <--> Lib
    Lib <--> Store
    Lib <--> FS

    Boot --> HomeF
    Boot --> DiographF
    DiographF --> Tools
    DiographF --> SidePanel

    HomeF -- "GET/SAVE_HOME_DIOGRAPH via invokeChannel" --> Preload
    HomeF -- "generateDiograph (preview scan)" --> DioryClient
    DiographF -- "generateDiograph(address, path) on navigation" --> DioryClient
    Tools -- "createDiory/updateDiory/deleteDiory/createLink" --> DioryClient

    DioryClient --> Diograph
    DioryClient -- "readTextItem/writeItem (diograph.json per folder)" --> FS
```

Electron main hosts filesystem/settingsStore access behind IPC (`preload.js` + `electron/lib/`). The React/Redux app has one feature module per concern (home, diograph, tools, lenses, sidePanel/navigation). All diograph reading/writing/mutation funnels through the single `DioryClient` instance, which owns the actual filesystem I/O and auto-save behavior — Redux never touches files directly, it only reflects `DioryClient`'s in-memory `Diograph` objects.