import React from 'react'

import { useDispatchActions } from '../../store'
import { useMapSelectedDiory } from '../tools/utils/useMapSelectedDiory'
import { useOnDioryClick } from '../tools/useOnDioryClick'
import { useOnCheckboxClick } from '../tools/useOnCheckboxClick'
import { useLinkDiories } from '../tools/actions/linkDiories'

import { updateDiory } from '../diograph/diographActions'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { HandView } from './components/HandView'

export const Hand = ({ diograph, createDiory }) => {
  const handDiory = createDiory({ id: 'hand' })
  const { story, memories } = getStoryDiories(handDiory.key, diograph)

  const { mapSelectedDiory } = useMapSelectedDiory()

  const { dispatch } = useDispatchActions()
  return (
    <HandView
      story={story}
      memories={memories.map(mapSelectedDiory)}
      onClick={useOnDioryClick()}
      onSelect={useOnCheckboxClick({ diograph })}
      onDrop={useLinkDiories()}
      onBackgroundDrop={useLinkDiories()}
      onClear={() => dispatch(updateDiory({ ...story, links: [] }))}
    />
  )
}
