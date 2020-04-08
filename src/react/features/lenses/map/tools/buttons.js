export const MAP_ADD_LOCATION = 'MAP_ADD_LOCATION'
export const MAP_MOVE_LOCATION = 'MAP_MOVE_LOCATION'
export const MAP_REMOVE_LOCATION = 'MAP_REMOVE_LOCATION'

export default [
  {
    id: MAP_ADD_LOCATION,
    text: 'Add location',
    data: {
      icon: 'plus',
    },
  },
  {
    id: MAP_REMOVE_LOCATION,
    text: 'Remove location',
    data: {
      icon: 'minus',
    },
  },
  {
    id: MAP_MOVE_LOCATION,
    text: 'Move location',
    data: {
      icon: 'move',
    },
  },
]
