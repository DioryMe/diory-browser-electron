import React from 'react'
import { useDispatch } from 'react-redux'

import { useDiograph } from '../diograph/utils/useDiograph'
import { useCreateDioryById } from '../tools/createDiory/useCreateDioryById'
import { useMapSelectedDiory } from '../tools/utils/useMapSelectedDiory'
import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'

import { updateDiory } from '../diograph/diographActions'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { HandView } from './components/HandView'

export const Hand = () => {
  const { diograph } = useDiograph()
  const handDiory = useCreateDioryById('hand', diograph) || {}
  const { story, memories } = getStoryDiories(handDiory.key, diograph)

  const { mapSelectedDiory } = useMapSelectedDiory()

  const { dispatch } = useDispatch()
  return (
    <HandView
      story={story}
      memories={memories.map(mapSelectedDiory)}
      onClick={useSelectStory()}
      onSelect={useSelectDiory()}
      onDrop={useLinkDiories()}
      onBackgroundDrop={useLinkDiories()}
      onClear={() => dispatch(updateDiory({ ...story, links: [] }))}
    />
  )
}
