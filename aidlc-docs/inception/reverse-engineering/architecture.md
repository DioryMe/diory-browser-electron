# Architecture Documentation — diory-browser-electron

## Business Overview

Diory Browser is a desktop application for browsing and managing a personal "diograph" — a graph-based data structure representing a user's digital memories (photos, videos, audio, documents, locations). Users can:

- Select a local folder as their Diory home location
- Browse their files as a visual diograph (grid of "diories")
- Navigate through linked diories (stories and memories)
- View content inline (images, video, audio, PDF, web)
- Organize content via drag-and-drop linking
- Explore content through multiple lenses (Graph, Map, Search, Timeline)
- Create, update, and delete diories and links

## Architecture Pattern

**Electron + React SPA (Renderer/Main Process split)**

```
+--------------------------------------------------+
|  ELECTRON MAIN PROCESS (electron-main.js)        |
|  - BrowserWindow creation                        |
|  - IPC handlers (showOpenDialog)                 |
|  - electron-store initialization                 |
|  - FFMPEG path setup                             |
+--------------------------------------------------+
         |  contextBridge (preload.js)
         v
+--------------------------------------------------+
|  ELECTRON RENDERER PROCESS (React SPA)           |
|  src/index.js -> App.js -> Root.js               |
|                                                  |
|  Redux Store (react-redux)                       |
|  +--------------------------------------------+ |
|  | home | buttons | content | diograph        | |
|  | lenses | navigation | sidePanel | tools    | |
|  +--------------------------------------------+ |
|                                                  |
|  Feature Modules (src/react/features/)           |
|  - home, buttons, content, diograph              |
|  - lenses, navigation, sidePanel, tools          |
+--------------------------------------------------+
         |  window.channelsApi / window.localClient
         v
+--------------------------------------------------+
|  NATIVE LAYER (via contextBridge)                |
|  - @diograph/local-client (file system ops)      |
|  - GET_HOME_ADDRESS / SAVE_HOME_ADDRESS channels |
|  - OPEN_FOLDER / OPEN_IN_BROWSER channels        |
|  - showOpenDialog (native folder picker)         |
+--------------------------------------------------+
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Desktop shell | Electron 19 |
| UI framework | React 17 |
| State management | Redux 4 + redux-thunk |
| UI components | evergreen-ui 7 |
| Drag and drop | react-dnd 15 |
| Map lens | Leaflet 1.8 |
| Graph lens | react-force-graph-3d + Three.js |
| PDF viewer | react-pdf 5 |
| Resizable panels | react-resizable-panels 2 |
| Build tool | react-scripts (CRA) 5 |
| Packaging | electron-builder |
| Unit tests | Jest |
| E2E tests | Cypress + TestCafe |
| Linting | ESLint (Airbnb) + Prettier |
| Media processing | ffmpeg-static |

## Key External Dependencies

- `@diograph/local-client` — local file system diograph client
- `@diory/client-js` — diory client library
- `electron-store` — persistent config storage
- `electron-log` — logging
