# Component Inventory — diory-browser-electron

## Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| App | src/react/App.js | Root: StoreProvider + Root |
| Root | src/react/layout/Root.js | DndProvider, Welcome/Home/Browser routing |
| Browser | src/react/layout/Browser.js | Main browser layout with resizable panels |

## Feature Components

### Home Feature
| Component | Purpose |
|-----------|---------|
| Home | Home screen (folder selection) |
| Welcome | First-run welcome screen with folder picker |
| useGetHomeEffect | Effect to load home address on mount |
| useReturnToHome | Hook to navigate back to home |
| useSaveHomeAddress | Hook to save home address via IPC |
| useIsHome | Hook: is current view the home screen? |

### Diograph Feature
| Component | Purpose |
|-----------|---------|
| Diograph | Main diograph grid view |
| DiographView | Renders story + memories grid |
| NavigationToSide | Left/right navigation arrows |
| DiographAddress | Breadcrumb address bar |
| NavigationDivider | Visual divider in navigation |
| useGenerateDiographEffect | Effect to generate/load diograph |
| useDiograph | Hook: diograph state + actions |
| useContextDiories | Hook: story context diories |
| getStoryDiories | Utility: get story + memories from diograph |

### Navigation Feature
| Component | Purpose |
|-----------|---------|
| Navigation | Top navigation bar |
| NavigationBar | Navigation bar container |
| NavigationContent | Navigation content section |
| useGoSide | Hook: navigate left/right between stories |

### Lenses Feature
| Component | Purpose |
|-----------|---------|
| Lenses | Lens container (renders active lens) |
| LensesButtons | Lens selector buttons |
| GraphLens | 3D force graph visualization |
| MapLens | Leaflet map with diory markers |
| SearchLens | Text search with results |
| TimelineLens | Timeline visualization (disabled) |
| useLens | Hook: is a given lens active? |

### Content Feature
| Component | Purpose |
|-----------|---------|
| Content | Content viewer container |
| ImageContent | Image viewer |
| VideoContent | Video player |
| AudioContent | Audio player |
| DocumentContent | PDF viewer (react-pdf) |
| WebContent | Web content viewer |
| useToggleContent | Hook: toggle content panel |

### Tools Feature
| Component | Purpose |
|-----------|---------|
| Tools | Tool panel (CRUD operations) |
| ToolButtons | Tool button bar |
| CreateDioryTool | Create new diory |
| UpdateDioryTool | Edit diory text/image |
| DeleteDioriesTool | Delete selected diories |
| DeleteLinksTool | Delete links between diories |
| TakeToHomeTool | Navigate to home diory |
| useOnDioryClick | Hook: handle diory click |
| useOnCheckboxClick | Hook: handle diory selection |
| useOnButtonClick | Hook: handle tool button click |
| useMapSelectedDiory | Hook: map selected state to diory |

### Hand Feature
| Component | Purpose |
|-----------|---------|
| Hand | Hand tool panel (temporary diory storage) |

### Favorites Feature
| Component | Purpose |
|-----------|---------|
| Favorites | Favorites sidebar |

### SidePanel Feature
| Component | Purpose |
|-----------|---------|
| SidePanel | Resizable side panel wrapper |
| PanelContainer | react-resizable-panels container |
| useSidePanel | Hook: panel open/close state |

### Buttons Feature
| Component | Purpose |
|-----------|---------|
| Buttons | Global button overlay |

## Shared Components

| Component | Purpose |
|-----------|---------|
| Diory | Single diory card (image + text) |
| BackgroundDiory | Full-background diory display |
| Button | Generic button |
| DragDrop | Drag-and-drop wrapper |
| Draggable | Draggable item wrapper |
| Droppable | Drop target wrapper |
| Fullscreen | Full-viewport overlay |
| FullscreenBackground | Full-viewport background |
| ScrollBackground | Scrollable background |
| ScrollVertically | Vertical scroll container |
| ZoomBar | Zoom control bar |
| MenuItem | Navigation menu item |
| Icon | Icon component |
