import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'

import { generateDiograph } from '../../diograph/diographActions'

import { buttons, BUTTON } from './buttons'

export const useGenerateTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (BUTTON === active) {
      dispatch(generateDiograph())
    }
  }, [active])
}
