import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import GridView from './GridView'
import Content from '../../content/Content'

const retrieveContent = (diory, room) => {
  const contentId = ((diory.data && diory.data[0]) || {}).contentUrl
  const dioryDup = { ...diory }
  dioryDup.contentUrl = room.getContent(contentId)
  return dioryDup
}

const getStory = (room, dioryId) => {
  const diory = room.diograph.getDiory(dioryId)
  return retrieveContent(diory, room)
}

const getMemories = (room, storyLinks) => {
  if (storyLinks) {
    return Object.entries(storyLinks)
      .map(([key, { id }]) => ({ key, ...room.diograph.getDiory(id) }))
      .filter(({ id }) => id)
      .map((diory) => retrieveContent(diory, room))
  }
  return []
}

const retrieveContentSourceList = async (diory) => {
  if (window.channelsApi) {
    const newDiograph = await window.channelsApi.listContentSource('tööö on ppolku')
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

const GridLens = ({ room }) => {
  console.log('I rendered')
  const { diograph } = room
  const [story, setStory] = useState(getStory(room, diograph.rootId))
  const [prevStory, setPrevStory] = useState([])
  const [memories, setMemories] = useState(getMemories(room, story.links))
  const [prevMemories, setPrevMemories] = useState([])

  const onMemoryClick = async ({ diory }) => {
    // Retrieve new story & memories by diory.id
    const newStory = getStory(room, diory.id)
    if (!newStory.data && (!newStory.links || Object.keys(newStory.links).length === 0)) {
      console.log('RETRIEVE STARTED!')
      diograph.deleteDiory(diory.id)
      const contentSourceList = await retrieveContentSourceList(diory)
      diograph.mergeDiograph(contentSourceList)
    }
    // Save previous story & memories
    setPrevStory(prevStory.concat([story]))
    setPrevMemories(prevMemories.concat([memories]))
    setStory(getStory(room, diory.id))
    setMemories(getMemories(room, getStory(room, diory.id).links))
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
