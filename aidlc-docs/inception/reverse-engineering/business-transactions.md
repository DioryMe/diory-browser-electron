# Business Transactions — diory-browser-electron

## Transaction 1: First-Run Setup (Choose Home Location)

**Trigger**: App starts with no saved home address
**Flow**:
1. `Welcome` component renders (address is undefined in Redux store)
2. User clicks the welcome diory
3. `useSaveHomeAddress` invokes `showOpenDialog` via IPC
4. Native folder picker dialog opens
5. User selects a folder
6. `SAVE_HOME_ADDRESS` channel called → `saveHomeAddress` in preload
7. Address saved to `electron-store` config
8. Redux store updated: `home.address` set
9. `Welcome` unmounts; `Home` or `Browser` renders

## Transaction 2: Load Diograph from Folder

**Trigger**: User enters a folder diograph
**Flow**:
1. `useGenerateDiographEffect` detects address change
2. Dispatches `GET_DIOGRAPH_BEGIN` → loading state shown
3. `@diograph/local-client` reads `diograph.json` from folder
4. If no `diograph.json`: generates diograph from file system
5. Dispatches `UPDATE_DIOGRAPH` with diory data
6. Dispatches `GET_DIOGRAPH_SUCCESS`
7. `DiographView` renders story + memories grid

## Transaction 3: Navigate to a Diory (Select Story)

**Trigger**: User clicks a diory in the grid
**Flow**:
1. `useOnDioryClick` dispatches `SELECT_STORY` with diory key
2. `navigationReducer.selectStory` updates:
   - `storyKey` = clicked diory key
   - `backward` = [previous storyKey, ...backward]
   - `forward` = []
   - `path` = [...path, key]
3. `Diograph` re-renders with new story + memories
4. `DiographAddress` updates breadcrumb

## Transaction 4: Navigate Backward/Forward

**Trigger**: User clicks back/forward navigation buttons
**Flow**:
1. Dispatches `GO_BACKWARD` or `GO_FORWARD`
2. `navigationReducer` pops from backward/forward stack
3. `storyKey` updated → diograph re-renders

## Transaction 5: View Content (Toggle Content Panel)

**Trigger**: User clicks the story diory (focus)
**Flow**:
1. `useToggleContent` dispatches content toggle action
2. `Content` component renders based on diory MIME type:
   - image/* → `ImageContent`
   - video/* → `VideoContent`
   - audio/* → `AudioContent`
   - application/pdf → `DocumentContent`
   - text/html → `WebContent`

## Transaction 6: Create Diory

**Trigger**: User activates Create Diory tool
**Flow**:
1. `CreateDioryTool` renders input form
2. User enters text/image
3. Dispatches create action → `@diograph/local-client` creates diory
4. `UPDATE_DIOGRAPH` dispatched with new diory
5. Grid re-renders with new diory

## Transaction 7: Update Diory

**Trigger**: User activates Update Diory tool on selected diory
**Flow**:
1. `UpdateDioryTool` renders edit form pre-filled with diory data
2. User modifies text/image
3. Dispatches update action → `@diograph/local-client` updates diory
4. `UPDATE_DIOGRAPH` dispatched
5. Grid re-renders with updated diory

## Transaction 8: Delete Diory/Links

**Trigger**: User selects diories and activates Delete tool
**Flow**:
1. `DeleteDioriesTool` shows confirmation dialog
2. Lists all diories and links to be deleted
3. User confirms
4. Dispatches delete action → `@diograph/local-client` removes diory + reverse links
5. `UPDATE_DIOGRAPH` dispatched
6. Grid re-renders without deleted diory

## Transaction 9: Drag-and-Drop Linking

**Trigger**: User drags a diory onto another
**Flow**:
1. `Draggable` wraps source diory
2. `Droppable` wraps target diory
3. On drop: `useLinkDiories` dispatches link action
4. `@diograph/local-client` creates bidirectional link
5. `UPDATE_DIOGRAPH` dispatched
6. Grid re-renders with new link

## Transaction 10: Search

**Trigger**: User activates Search lens and types query
**Flow**:
1. `SearchLens` renders search input
2. User types query
3. Diories filtered by text match
4. Results displayed as diory grid
5. User can drag results to link them

## Transaction 11: Map Lens

**Trigger**: User activates Map lens
**Flow**:
1. `MapLens` renders Leaflet map
2. Diories with `latlng` data shown as markers
3. User clicks marker → selects diory
4. User can create diory at location or move location

## Transaction 12: Graph Lens

**Trigger**: User activates Graph lens
**Flow**:
1. `GraphLens` renders 3D force graph
2. Diories shown as nodes, links as edges
3. User clicks node → selects diory
