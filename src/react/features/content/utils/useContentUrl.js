import { useEffect } from 'react'
import { useDispatchActions } from '../../../store'
import { useStoryDiories } from '../../diograph/utils/useDiories'

import { setContentUrl } from '../contentActions'

export const useContentUrl = () => {
  const { story } = useStoryDiories()
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
