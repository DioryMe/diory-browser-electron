import { useDispatchActions, useSelector } from '../../store'
import { useEffect } from 'react'
import { addContent, inactivateContent, removeContent } from './contentActions'

export const useActiveContent = (callback) => {
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(addContent())
    return () => dispatch(removeContent())
  }, [dispatch])

  const { active } = useSelector((state) => state.content)
  useEffect(() => {
    if (active) {
      callback()
      dispatch(inactivateContent())
    }
  }, [dispatch, active, callback])
}
