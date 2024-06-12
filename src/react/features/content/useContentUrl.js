import { useEffect } from 'react'
import { useDispatchActions } from '../../store'
import { useDiograph } from '../diograph/useDiograph'

import { setContentUrl } from './contentActions'
import { convertToFileUrl } from '../../utils'

export const useContentUrl = () => {
  const { story } = useDiograph()
  const { data = [] } = story
  const { contentUrl } = (data && data[0]) || {}
  const url = convertToFileUrl(contentUrl)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    dispatch(setContentUrl(url))
  }, [dispatch, url])
}
