import React from 'react'
import { useDispatch } from 'react-redux'

import { useCreateDioryById } from '../tools/createDiory/useCreateDioryById'

import { useDiories } from '../diograph/utils/useDiories'
import { useSelectedDiories } from '../tools/utils/useSelectedDiories'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'
import { updateDiory } from '../diograph/diographActions'

import { HandView } from './components/HandView'

export const Hand = () => {
  const handDiory = useCreateDioryById('hand') || {}
  const { story, memories } = useDiories(handDiory.key)

  const { mapSelectedDiory } = useSelectedDiories()

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
