import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import GridView from './GridView'
import Content from '../../content/Content'

const getStory = (diograph, dioryId) => diograph.getDiory(dioryId)

const getMemories = (diograph, story) => {
  if (story.links) {
    return Object.entries(story.links)
      .map(([key, { id }]) => ({ key, ...diograph.getDiory(id) }))
      .filter(({ id }) => id)
  }
  return []
}

const GridLens = ({ room }) => {
  console.log('I rendered')
  const { diograph } = room
  const [story, setStory] = useState(diograph.getDiory(diograph.rootId))
  const [prevStory, setPrevStory] = useState([])
  const [memories, setMemories] = useState(getMemories(diograph, story))
  const [prevMemories, setPrevMemories] = useState([])

  const onMemoryClick = ({ diory }) => {
    // Save previous story & memories
    setPrevStory(prevStory.concat([story]))
    setPrevMemories(prevMemories.concat([memories]))
    // Retrieve new story & memories by diory.id
    const newStory = getStory(diograph, diory.id)
    if (!newStory.data && !newStory.links) {
      // TODO: Empty one folder in diograph.json
      console.log('RETRIEVE STARTED!')
    }
    setStory(newStory)
    setMemories(getMemories(diograph, newStory))
  }

  const onPreviousClick = () => {
    setStory(prevStory[prevStory.length - 1])
    setMemories(prevMemories[prevMemories.length - 1])
    setPrevStory(prevStory.slice(0, prevStory.length - 1))
    setPrevMemories(prevMemories.slice(0, prevMemories.length - 1))
  }

  const gridProps = {
    story,
    memories,
    onMemoryClick,
  }

  return (
    <>
      {story.data ? <Content diory={story} /> : <GridView {...gridProps} />}
      <Button onClick={onPreviousClick}>---- GO BACK ----</Button>
    </>
  )
}

GridLens.propTypes = {
  room: PropTypes.object.isRequired,
}

export default GridLens
