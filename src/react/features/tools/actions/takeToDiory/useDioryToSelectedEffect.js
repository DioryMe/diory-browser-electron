import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../../store'
import { useDiograph } from '../../../diograph/utils/useDiograph'

import { clearSelectedDiories, setSelectedDiories } from '../../toolsActions'

import { TAKE_TOOL_BUTTON } from './buttons'

export const isDioryInDiograph = (dioryId, diograph) => {
  const dioryIds = Object.entries(diograph)
    .map(([, { id }]) => id)
  return dioryIds.includes(dioryId)
}

export const useDioryToSelectedEffect = () => {
  const { address } = useSelector((state) => state.home)
  const { diograph: homeDiograph } = useDiograph(address)
  const { diograph } = useDiograph()

  const selectedDiories = Object.entries(diograph)
    .filter(([,{ id }]) => isDioryInDiograph(id, homeDiograph))
    .map(([key]) => key)
    .reduce((obj, key) => {
      obj[key] = true
      return obj
    }, {})

  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    if (TAKE_TOOL_BUTTON === active) {
      dispatch(setSelectedDiories(selectedDiories))
    }

    return () => dispatch(clearSelectedDiories())
  }, [active])
}
