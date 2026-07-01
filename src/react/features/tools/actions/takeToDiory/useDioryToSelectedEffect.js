import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../../../store'
import { useDiograph } from '../../../diograph/utils/useDiograph'

import { clearSelectedDiories, setSelectedDiories } from '../../toolsActions'
import { getHomeDioryDiograph, isDioryInDiograph } from '../../../home/homeActions'

import { TAKE_TOOL_BUTTON } from './buttons'

export const useDioryToSelectedEffect = () => {
  const { diograph } = useDiograph()

  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()

  useEffect(() => {
    if (TAKE_TOOL_BUTTON === active) {
      dispatch(getHomeDioryDiograph()).then((dioryDiograph) => {
        const selectedDiories = Object.entries(diograph)
          .filter(([, { id }]) => isDioryInDiograph(id, dioryDiograph))
          .reduce((obj, [key]) => {
            obj[key] = true
            return obj
          }, {})
        dispatch(setSelectedDiories(selectedDiories))
      })
    }

    return () => dispatch(clearSelectedDiories())
  }, [active])
}
