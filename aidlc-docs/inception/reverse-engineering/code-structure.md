# Code Structure Documentation — diory-browser-electron

## Directory Layout

```
diory-browser-electron/
├── electron-main.js          # Electron main process entry point
├── electron/
│   ├── preload.js            # contextBridge: exposes APIs to renderer
│   └── lib/
│       ├── getHomeAddress.js # Read home address from electron-store
│       ├── saveHomeAddress.js# Save home address to electron-store
│       ├── show-open-dialog.js # Native folder picker dialog
│       └── utils.js
├── src/
│   ├── index.js              # React entry point (ReactDOM.render)
│   ├── index.css             # Global styles
│   ├── setupTests.js         # Jest setup
│   ├── shared/
│   │   └── constants.js      # IPC channel names (shared main/renderer)
│   └── react/
│       ├── App.js            # Root component: StoreProvider + Root
│       ├── layout/
│       │   ├── Root.js       # DndProvider, Welcome/Home/Browser routing
│       │   └── Browser.js    # Main browser layout with resizable panels
│       ├── store/
│       │   ├── index.js      # Redux store creation + exports
│       │   ├── reducer.js    # combineReducers (all feature reducers)
│       │   ├── actions.js    # resetStore action
│       │   ├── actionsTypes.js
│       │   ├── middlewares.js # logger + errorReporter middleware
│       │   ├── storeUtils.js  # createReducer, createActions, promiseReducers
│       │   └── StoreProvider.js
│       ├── client/
│       │   ├── client.js     # invokeChannel: mock-aware IPC bridge
│       │   ├── client.mock.js# Mock responses for development
│       │   └── alertDialog.js# Error alert dialog
│       ├── components/       # Shared UI components
│       │   ├── diories/      # Diory, BackgroundDiory, etc.
│       │   ├── menu/         # MenuItem
│       │   ├── Button.js
│       │   ├── DragDrop.js, Draggable.js, Droppable.js
│       │   ├── Fullscreen.js, FullscreenBackground.js
│       │   ├── ScrollBackground.js, ScrollVertically.js
│       │   └── ZoomBar.js
│       ├── utils/            # Shared hooks and utilities
│       │   ├── debounce.js
│       │   ├── getLocalAddress.js
│       │   ├── reduceIdsToKeys.js
│       │   ├── unique.js
│       │   ├── useCompare.js
│       │   └── useKeyPress.js
│       └── features/         # Feature modules (Redux slice pattern)
│           ├── home/         # Home screen, address management
│           ├── buttons/      # Button state management
│           ├── content/      # Content viewer (image/video/audio/PDF/web)
│           ├── diograph/     # Diograph loading and display
│           ├── favorites/    # Favorites sidebar
│           ├── hand/         # Hand tool (temporary diory storage)
│           ├── lenses/       # Graph/Map/Search/Timeline lenses
│           ├── navigation/   # Navigation state (story/backward/forward)
│           ├── sidePanel/    # Resizable side panel management
│           └── tools/        # CRUD tools (create/update/delete diory)
```

## Feature Module Pattern

Each feature follows a consistent Redux slice pattern:

```
features/{name}/
├── {Name}.js              # Main React component
├── {name}Actions.js       # Thunk action creators
├── {name}ActionTypes.js   # Action type constants
├── {name}Reducer.js       # Reducer (uses createReducer from storeUtils)
├── components/            # Sub-components
└── utils/                 # Feature-specific hooks and utilities
```

## Redux Store Shape

```javascript
{
  home: {
    address: string | undefined,  // Home folder path
    isHome: boolean,
    loading: boolean,
    loaded: boolean,
    saving: boolean,
    saved: boolean,
  },
  buttons: { /* button open/active states */ },
  content: { /* content viewer state */ },
  diograph: {
    address: string | null,
    isDiory: boolean,
    diograph: { [key]: diory },
    loading: { [address]: boolean },
    loaded: { [address]: boolean },
    error: { [address]: any },
  },
  lenses: { /* active lens state */ },
  navigation: {
    storyKey: string | undefined,
    contextKey: string | undefined,
    backward: string[],
    forward: string[],
    path: string[],
  },
  sidePanel: { /* left/right/bottom panel open states */ },
  tools: { /* active tool state */ },
}
```

## IPC Communication Pattern

```
Renderer (React)
  -> invokeChannel(channel, params)
    -> window.channelsApi[channel](params)  [via contextBridge]
      -> Electron main process handler
        -> Returns Promise<response>
```

Channels defined in `src/shared/constants.js`:
- `GET_HOME_ADDRESS` — read stored home folder path
- `SAVE_HOME_ADDRESS` — save home folder path
- `OPEN_FOLDER` — reveal file in Finder/Explorer
- `OPEN_IN_BROWSER` — open URL in default browser
