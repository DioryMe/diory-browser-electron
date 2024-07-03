import { useEffect } from 'react'
import { useDispatchActions } from '../../store'
import { useDiograph } from '../diograph/useDiograph'

import { setContentUrl } from './contentActions'
import { getContentUrlFromCID } from '../../utils'

export const useContentUrl = () => {
  const { story } = useDiograph()
  const { data = [] } = story
  const { contentUrl, encodingFormat } = (data && data[0]) || {}
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (contentUrl) {
      getContentUrlFromCID(contentUrl, encodingFormat)
        .then((url) => {
          dispatch(setContentUrl(url))
        })
        .catch((error) => {
          console.error('useContentUrl error:', contentUrl, encodingFormat, error)
        })
    }
  }, [dispatch, contentUrl, encodingFormat])
}
