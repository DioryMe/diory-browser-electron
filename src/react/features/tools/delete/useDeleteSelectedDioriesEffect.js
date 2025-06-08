import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useDiories } from '../../diograph/utils/useDiories'

import { inactivateButton } from '../../buttons/buttonsActions'
import { selectDiory } from '../../navigation/navigationActions'
import { deleteLinks } from '../../diograph/diographActions'


import { DELETE_TOOL_BUTTON } from './buttons'

export const useDeleteSelectedDioriesEffect = () => {
  const { story } = useDiories()
  const { selectedDiories } = useSelector((state) => state.navigation)
  const { diograph } = useSelector((state) => state.diograph)
  const deletedLinks = Object.entries(selectedDiories)
    .filter(([, selected]) => selected)
    .map(([key]) => ({ fromDiory: story, toDiory: { key, ...diograph[key] } }))

  const { active } = useSelector((state) => state.buttons)
  const act = DELETE_TOOL_BUTTON === active && deletedLinks.length

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (act) {
      dispatch(deleteLinks(deletedLinks))
      dispatch(inactivateButton())
      dispatch(selectDiory({ key: null }))
    }
  }, [act, deletedLinks])
}
