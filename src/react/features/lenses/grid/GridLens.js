import React, { useState } from 'react'
import PropTypes from 'prop-types'

import GridView from './GridView'

const getStory = (room, dioryId) => room.diograph.getDiory(dioryId)

const getMemories = (room, story) =>
  Object.entries(story.links)
    .map(([key, { id }]) => ({ key, ...room.diograph.getDiory(id) }))
    .filter(({ id }) => id)

const GridLens = ({ room }) => {
  console.log('I rendered')
  const [story, setStory] = useState(room.diograph.getDiory(room.diograph.rootId))
  const [memories, setMemories] = useState(getMemories(room, story))

  const onMemoryClick = ({ diory }) => {
    const newStory = getStory(room, diory.id)
    setStory(newStory)
    setMemories(getMemories(room, newStory))
  }

  const onPreviousClick = () => {
    console.log('prevclick')
  }

  const gridProps = {
    story,
    memories,
    onMemoryClick,
    onPreviousClick,
  }

  return <GridView {...gridProps} />
}

GridLens.propTypes = {
  room: PropTypes.object.isRequired,
}

export default GridLens
