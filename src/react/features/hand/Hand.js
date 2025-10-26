import React from 'react'
import { useDispatch } from 'react-redux'

import { useCreateHomeDiory } from '../home/utils/useCreateHomeDiory'

import { useHomeKey } from '../home/utils/useHomeKey'
import { useDiories } from '../diograph/utils/useDiories'
import { useSelectedDiories } from '../tools/utils/useSelectedDiories'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'
import { updateDiory } from '../diograph/diographActions'

import { HandView } from './components/HandView'

export const Hand = () => {
  useCreateHomeDiory('hand')

  const handKey = useHomeKey('hand')
  const { story, memories } = useDiories(handKey)
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
