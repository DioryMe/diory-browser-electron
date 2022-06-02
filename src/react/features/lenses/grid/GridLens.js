import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions, useSelector } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'
import { useToggleContent } from '../../content/useToggleContent'

import { useDeleteTool } from '../../tools/delete'
import { useStoryTool } from '../../tools/story'
import { useUpdateTool } from '../../tools/update'
import { useImportTools } from '../../tools/import/useImportTools'

import { withLensContainer } from '../withLensContainer'

import { createLink } from '../../diograph/diographActions'

import GridView from './GridView'

const useTools = () => {
  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const { toggleContent } = useToggleContent()

  useImportTools()

  const { dispatch } = useDispatchActions()

  return {
    onStoryClick: ({ diory }) => {
      toggleContent()
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMemoryClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const getStory = (room, dioryId) => room.diograph.getDiory(dioryId)

const getMemories = (room, story) => {
  if (!story.links) {
    return []
  }

  return Object.entries(story.links)
    .map(([key, { id }]) => ({ key, ...room.diograph.getDiory(id) }))
    .filter(({ id }) => id)
}

const GridLens = ({ room }) => {
  console.log('I rendered')
  const [story, setStory] = useState(room.diograph.getDiory(room.diograph.rootId))
  const [memories, setMemories] = useState(getMemories(room, story))

  const onMemoryClick = ({ diory }) => {
    const newStory = getStory(room, diory.id)
    setStory(newStory)
    setMemories(getMemories(room, newStory))
  }

  const gridProps = {
    story,
    memories,
    onMemoryClick,
  }

  return <GridView {...useTools()} {...gridProps} room={room} />
}

GridLens.propTypes = {
  room: PropTypes.object.isRequired,
}

export default GridLens
