import { useEffect } from 'react'
import { useDispatch } from '../../../store'
import { addButtons, removeButtons } from '../../buttons/actions'

import buttons from './buttons'

export const useEditButtons = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addButtons(buttons))
    return () => dispatch(removeButtons(buttons))
  }, [])
}
