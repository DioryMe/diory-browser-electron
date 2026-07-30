import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'
import { useCloseButtons } from '../../../buttons/useButtonActions'
import { useSelectedDiories } from '../../utils/useSelectedDiories'

import { updateDiory } from '../../../diograph/diographActions'
import { getStoryDiories } from '../../../diograph/utils/getStoryDiories'

import { buttons, SELECT_IMAGE_BUTTON } from './buttons'

export const useSelectImage = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story } = getStoryDiories(storyKey, diograph)

  const { selectedDiories } = useSelectedDiories()
  const { dispatch } = useDispatchActions()
  const { closeButtons } = useCloseButtons()

  useEffect(() => {
    if (SELECT_IMAGE_BUTTON === active && selectedDiories.length) {
      dispatch(updateDiory({ ...story, image: selectedDiories[0].image }))
      closeButtons()
    }
  }, [active, selectedDiories])
}
