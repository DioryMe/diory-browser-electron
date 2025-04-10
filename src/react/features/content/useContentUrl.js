import { useEffect } from 'react'
import { useDispatchActions } from '../../store'
import { useDiograph } from '../diograph/useDiograph'

import { setContentUrl } from './contentActions'

export const useContentUrl = () => {
  const { story } = useDiograph()
  const { data = [] } = story
  const { contentUrl, encodingFormat } = (data && data[0]) || {}
  const address = `${story.key}/${contentUrl}`
  console.log(address)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(setContentUrl(address))
    }
  }, [dispatch, address, encodingFormat])
}
