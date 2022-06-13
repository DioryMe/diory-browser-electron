import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import GridView from './GridView'
import Content from '../../content/Content'

const getStory = (diograph, dioryId) => {
  return diograph.getDiory(dioryId)
}

const getMemories = (diograph, storyLinks) => {
  if (storyLinks) {
    return Object.entries(storyLinks)
      .map(([key, { id }]) => ({ key, ...diograph.getDiory(id) }))
      .filter(({ id }) => id)
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
    // TODO: Add these links also to connection!!!
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

const retrieveMoreDiories = async (story, diograph, contentSourceAddress, connection) => {
  // Retrieve missing diories to diograph
  if (!story.data && (!story.links || Object.keys(story.links).length === 0)) {
    console.log('RETRIEVE STARTED!')
    diograph.deleteDiory(story.id)
    const contentSourceList = await retrieveContentSourceList(story, contentSourceAddress)
    // TODO: These new diories need story.contentUrl to be able to show <Content />
    // - requires also adding contentUrl to Connection => no Connections here yet!!g
    diograph.mergeDiograph(contentSourceList)
    // => HOW TO DO THIS SAME TO connection.contentUrl DIOGRAPH??! (otherwise it won't persist...)

    diograph.diories.forEach((diory) => {
      // TODO: Folder diories don't have any contentUrl...
      if (diory.data && diory.data[0].contentUrl) {
        connection.addContentUrl(diory.data[0].contentUrl, diory.contentUrl, diory)
      }
    })
    console.log('diogr', diograph)
    console.log('conn', connection)

    // addContentUrl = (contentUrl: string, internalPath: string, diory: Diory) => {
  }
}

const GridLens = ({ connection }) => {
  console.log('I rendered')

  const contentSourceAddress = connection.address
  const { diograph } = connection
  console.log('org-diogr', diograph)
  const [storyState, setStoryState] = useState({
    story: null,
    memories: [],
    prevStory: [],
    prevMemories: [],
  })

  useEffect(() => {
    const rootStory = getStory(diograph, diograph.rootId) // TODO: Replace '/' with some dynamic rootId
    retrieveMoreDiories(rootStory, diograph, contentSourceAddress, connection).then(() => {
      const updatedRootStory = getStory(diograph, rootStory.id)
      setStoryState({
        ...storyState,
        story: updatedRootStory,
        memories: getMemories(diograph, updatedRootStory.links),
      })
    })
  }, [])

  const onMemoryClick = ({ diory }) => {
    retrieveMoreDiories(diory, diograph, contentSourceAddress, connection).then(() => {
      setStoryState({
        ...storyState,
        story: getStory(diograph, diory.id),
        memories: getMemories(diograph, getStory(diograph, diory.id).links),
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
