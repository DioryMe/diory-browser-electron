import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import GridView2 from './GridView2'

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
  if (window.channelsApi) {
    const newDiograph = await window.channelsApi.listContentSource(diory.id, contentSourceAddress)
    const links = {}
    Object.values(newDiograph).forEach((newDiographDiory) => {
      links[newDiographDiory.id] = { id: newDiographDiory.id }
    })
    newDiograph[diory.id] = { ...diory.toObject() }
    newDiograph[diory.id].links = links
    return newDiograph
  }
  throw new Error('No mock available.')
}

const retrieveMoreDiories = async (
  story,
  diograph,
  contentSourceAddress,
  connection,
  onDiographChange
) => {
  // Retrieve missing diories to diograph
  if (story.id.slice(-1) === '/' && (!story.links || Object.keys(story.links).length === 0)) {
    console.log('RETRIEVE STARTED!')
    diograph.deleteDiory(story.id)
    const contentSourceList = await retrieveContentSourceList(story, contentSourceAddress)
    diograph.mergeDiograph(contentSourceList)
    diograph.diories.forEach((diory) => {
      if (diory.data && diory.data[0].contentUrl) {
        connection.addContentUrl(diory.data[0].contentUrl, diory.id)
      }
    })
    onDiographChange()
  }
}

const GridLens2 = ({ connection, onDiographChange }) => {
  console.log('GridLens rendered')

  const contentSourceAddress = connection.address
  const { diograph } = connection
  const [storyState, setStoryState] = useState({
    story: null,
    memories: [],
    prevStory: [],
    prevMemories: [],
  })

  useEffect(() => {
    const rootStory = getStory(diograph, diograph.rootId)
    retrieveMoreDiories(
      rootStory,
      diograph,
      contentSourceAddress,
      connection,
      onDiographChange
    ).then(() => {
      const updatedRootStory = getStory(diograph, rootStory.id)
      setStoryState({
        ...storyState,
        story: updatedRootStory,
        memories: getMemories(diograph, updatedRootStory.links),
      })
    })
  }, [])

  const onMemoryClick = ({ diory: { id } }) => {
    const diory = getStory(diograph, id)
    if (diory.id.slice(-1) !== '/') {
      // Only folder diories have clicks
      return
    }
    retrieveMoreDiories(diory, diograph, contentSourceAddress, connection, onDiographChange).then(
      () => {
        const story = getStory(diograph, diory.id)
        setStoryState({
          ...storyState,
          story,
          memories: getMemories(diograph, story.links),
          prevStory: storyState.prevStory.concat([storyState.story]),
          prevMemories: storyState.prevMemories.concat([storyState.memories]),
          contentUrl:
            story.data && story.data[0] && connection.getContent(story.data[0].contentUrl),
        })
      }
    )
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
        <GridView2 {...gridProps} />
        <Button disabled={gridProps.story.id === '/'} onClick={onPreviousClick}>
          ---- GO BACK ----
        </Button>
      </>
    )
  )
}

GridLens2.propTypes = {
  connection: PropTypes.object.isRequired,
  onDiographChange: PropTypes.func,
}

export default GridLens2
