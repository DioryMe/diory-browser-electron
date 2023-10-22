import React, { useState } from 'react'
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree'

import { useDispatchActions, useSelector } from '../../store'

import { selectRoom } from '../navigation/navigationActions'

import 'react-complex-tree/lib/style-modern.css'

const removeLinks = ([key, { id }]) => key === id

const mapToItem = ([_, { id, doors = [] }]) => ({
  index: id,
  isFolder: !!doors.length,
  children: doors.map(({ id }) => id),
  data: id,
})

const useTreeItems = () => {
  const { rooms = {} } = useSelector((state) => state.diosphere)
  const homeRoom = rooms['/'] || {}
  const roomItems = Object.entries(rooms).filter(removeLinks).map(mapToItem)
  return {
    items: roomItems.reduce(
      (items, item) => ({
        ...items,
        [item.index]: item,
      }),
      {
        root: {
          id: 'root',
          isFolder: true,
          children: [homeRoom.id],
        },
      }
    ),
  }
}

const useTreeEnvironment = () => {
  const { roomId } = useSelector((props) => props.navigation)
  const [expandedItems, setExpandedItems] = useState([])
  const { dispatch } = useDispatchActions()
  return {
    viewState: {
      rooms: {
        focusedItem: roomId,
        expandedItems,
        selectedItems: [roomId],
      },
    },
    onFocusItem: (item) => dispatch(selectRoom(item.index)),
    onExpandItem: (item) => setExpandedItems([...expandedItems, item.index]),
    onCollapseItem: (item) =>
      setExpandedItems(
        expandedItems.filter((expandedItemIndex) => expandedItemIndex !== item.index)
      ),
  }
}

export const DiosphereView = () => {
  const { items } = useTreeItems()
  const treeEnvironment = useTreeEnvironment()
  return (
    <ControlledTreeEnvironment
      {...treeEnvironment}
      items={items}
      getItemTitle={(item) => item.data}
    >
      <div className="rct-dark" style={{ backgroundColor: '#222', color: '#e3e3e3' }}>
        <Tree treeId="rooms" rootItem="root" treeLabel="rooms" />
      </div>
    </ControlledTreeEnvironment>
  )
}
