import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import GridView from './GridView'
import Content from '../../content/Content'

const getStory = (connection, dioryId) => {
  const story = connection.diograph.getDiory(dioryId)
  return connection.retrieveContent(story)
}

const getMemories = (connection, storyLinks) => {
  if (storyLinks) {
    return Object.entries(storyLinks)
      .map(([key, { id }]) => ({ key, ...connection.diograph.getDiory(id) }))
      .filter(({ id }) => id)
      .map((diory) => connection.retrieveContent(diory))
  }
  return []
}

const retrieveContentSourceList = async (diory, contentSourceAddress) => {
  // TODO: How to derive path for listContentSource based on diory?!!?
  if (window.channelsApi) {
    const newDiograph = await window.channelsApi.listContentSource(diory.id, contentSourceAddress)
    const links = {}
    Object.values(newDiograph).forEach((newDiographDiory) => {
      links[newDiographDiory.id] = { id: newDiographDiory.id }
    })
    newDiograph[diory.id] = { ...diory.toDioryObject() }
    newDiograph[diory.id].links = links
    return newDiograph
  }
  // Mock response
  const { links, newDiograph } =
    diory.id === '/'
      ? require('./mock-response-listContentSource-root.json')
      : require('./mock-response-listContentSource-jane.json')
  // Add links to root
  newDiograph[diory.id] = { ...diory }
  newDiograph[diory.id].links = links
  return newDiograph
}

const retrieveMoreDiories = async (story, diograph, contentSourceAddress) => {
  // Retrieve missing diories to diograph
  if (!story.data && (!story.links || Object.keys(story.links).length === 0)) {
    console.log('RETRIEVE STARTED!')
    diograph.deleteDiory(story.id)
    const contentSourceList = await retrieveContentSourceList(story, contentSourceAddress)
    // TODO: These new diories need story.contentUrl to be able to show <Content />
    // - requires also adding contentUrl to Connection => no Connections here yet!!g
    diograph.mergeDiograph(contentSourceList)
  }
}

const GridLens = ({ connection }) => {
  console.log('I rendered')

  const contentSourceAddress = connection.connections[0].address
  const { diograph } = connection
  const [storyState, setStoryState] = useState({
    story: null,
    memories: [],
    prevStory: [],
    prevMemories: [],
  })

  useEffect(() => {
    const rootStory = getStory(connection, diograph.rootId)
    retrieveMoreDiories(rootStory, diograph, contentSourceAddress).then(() => {
      const updatedRootStory = getStory(connection, rootStory.id)
      setStoryState({
        ...storyState,
        story: updatedRootStory,
        memories: getMemories(connection, updatedRootStory.links),
      })
    })
  }, [])

  const onMemoryClick = ({ diory }) => {
    retrieveMoreDiories(diory, diograph, contentSourceAddress).then(() => {
      setStoryState({
        ...storyState,
        story: getStory(connection, diory.id),
        memories: getMemories(connection, getStory(connection, diory.id).links),
        prevStory: storyState.prevStory.concat([storyState.story]),
        prevMemories: storyState.prevMemories.concat([storyState.memories]),
      })
    })
  }

  const onPreviousClick = () => {
    setStoryState({
      ...storyState,
      story: storyState.prevStory[storyState.prevStory.length - 1],
      memories: storyState.prevMemories[storyState.prevMemories.length - 1],
      prevStory: storyState.prevStory.slice(0, storyState.prevStory.length - 1),
      prevMemories: storyState.prevMemories.slice(0, storyState.prevMemories.length - 1),
    })
  }

  const gridProps = {
    story: storyState.story,
    memories: storyState.memories,
    onMemoryClick,
  }

  return (
    gridProps.story && (
      <>
        {gridProps.story.data ? <Content diory={gridProps.story} /> : <GridView {...gridProps} />}
        <Button disabled={gridProps.story.id === '/'} onClick={onPreviousClick}>
          ---- GO BACK ----
        </Button>
      </>
    )
  )
}

GridLens.propTypes = {
  connection: PropTypes.object.isRequired,
}

export default GridLens
