
# Decisions
## Files and files are the default view
Similar view as in Finder / File Explorer feels familiar and creates confidence.

## Code is structured based on features
Structure code on features.
Each feature can contain:
- actions
- clients
- components
- hooks
- reducers
- specs
- styles

## Write tests. Not too many. Mostly integration (feature)
Do not test implementation details.
Do as little as possible
Test higher in the tree

- code -> eslint
- types -> typescript --checkJS (?)
- format -> prettier
- logic -> jest
- feature -> cucumber
- ui -> storybook, snapshot


## Map lens
Leaflet library with openstreetmap tiles
+ Open source and free
+ Easy and comprehensive API
- Plain javascript
- Interaction with popups
- CSS import in index.html
= Consider changing to react-leaflet

Bounds
1. Locations of links and diory
2. Center and zoom 15
3. Earth



