import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import GridView from './GridView'
import Content from '../../content/Content'

const getStory = (room, dioryId) => {
  const story = room.diograph.getDiory(dioryId)
  return room.retrieveContent(story)
}

const getMemories = (room, storyLinks) => {
  if (storyLinks) {
    return Object.entries(storyLinks)
      .map(([key, { id }]) => ({ key, ...room.diograph.getDiory(id) }))
      .filter(({ id }) => id)
      .map((diory) => room.retrieveContent(diory))
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
    newDiograph[diory.id] = { ...diory }
    newDiograph[diory.id].links = links
    return newDiograph
  }
  // Mock response
  const links = {
    'PIXNIO-12656-2816x2112.jpeg': {
      id: '6abcc50e-422e-4802-9b14-84fcdd08f591',
    },
    'PIXNIO-12662-2816x2112.jpeg': {
      id: 'e488d7e0-773f-4218-b893-2d0d164cce18',
    },
    'PIXNIO-12700-2816x2112.jpeg': {
      id: 'dd1a14b9-f564-4c2c-8330-df29cd78ac45',
    },
  }
  const newDiograph = {
    '6abcc50e-422e-4802-9b14-84fcdd08f591': {
      id: '6abcc50e-422e-4802-9b14-84fcdd08f591',
      image: '../demo-content-room/Diory Content/Jane/PIXNIO-12656-2816x2112.jpeg',
      created: '2021-02-25T12:27:27.226Z',
      modified: '2021-02-25T12:27:27.436Z',
      data: [
        {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          contentUrl: 'PIXNIO-12656-2816x2112.jpeg',
          height: 2112,
          width: 2816,
          encodingFormat: 'image/jpeg',
        },
      ],
    },
    'e488d7e0-773f-4218-b893-2d0d164cce18': {
      id: 'e488d7e0-773f-4218-b893-2d0d164cce18',
      image: '../demo-content-room/Diory Content/Jane/PIXNIO-12662-2816x2112.jpeg',
      created: '2021-02-25T12:27:27.441Z',
      modified: '2021-02-25T12:27:27.467Z',
      data: [
        {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          contentUrl: 'PIXNIO-12662-2816x2112.jpeg',
          height: 2112,
          width: 2816,
          encodingFormat: 'image/jpeg',
        },
      ],
    },
    'dd1a14b9-f564-4c2c-8330-df29cd78ac45': {
      id: 'dd1a14b9-f564-4c2c-8330-df29cd78ac45',
      image: '../demo-content-room/Diory Content/Jane/PIXNIO-12700-2816x2112.jpeg',
      created: '2021-02-25T12:27:27.474Z',
      modified: '2021-02-25T12:27:27.483Z',
      data: [
        {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          contentUrl: 'PIXNIO-12700-2816x2112.jpeg',
          height: 2112,
          width: 2816,
          encodingFormat: 'image/jpeg',
        },
      ],
    },
  }
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

const GridLens = ({ room, contentSourceAddress }) => {
  console.log('I rendered')

  const { diograph } = room
  const [storyState, setStoryState] = useState({
    story: null,
    memories: [],
    prevStory: [],
    prevMemories: [],
  })

  useEffect(() => {
    const rootStory = getStory(room, diograph.rootId)
    retrieveMoreDiories(rootStory, diograph, contentSourceAddress).then(() => {
      const updatedRootStory = getStory(room, rootStory.id)
      setStoryState({
        ...storyState,
        story: updatedRootStory,
        memories: getMemories(room, updatedRootStory.links),
      })
    })
  }, [])

  const onMemoryClick = ({ diory }) => {
    retrieveMoreDiories(diory, diograph, contentSourceAddress).then(() => {
      setStoryState({
        ...storyState,
        story: getStory(room, diory.id),
        memories: getMemories(room, getStory(room, diory.id).links),
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
        <Button disabled={gridProps.story.id === 'some-diory-id'} onClick={onPreviousClick}>
          ---- GO BACK ----
        </Button>
      </>
    )
  )
}

GridLens.propTypes = {
  room: PropTypes.object.isRequired,
  contentSourceAddress: PropTypes.string.isRequired,
}

export default GridLens
