import { useEffect, useMemo } from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { selectStory } from '../navigation/navigationActions'
import { generateDiograph } from './diographActions'
import { getStoryDiories } from './utils/getStoryDiories'
import { getDiographAddress } from './utils/diographUtils'
import { unique } from '../../utils/unique'

const useMemoryAddresses = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story = {} } = getStoryDiories(storyKey, diograph)

  return useMemo(
    () =>
      story.links &&
      story.links.map(({ id } = {}) => getDiographAddress(story.key, id)).filter(unique),
    [story.links]
  )
}

export const useGenerateDiographEffect = () => {
  const { address } = useSelector((state) => state.diograph)
  const addresses = useMemoryAddresses()

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (address) {
      dispatch(generateDiograph(address))
      dispatch(selectStory({ key: address }))
    }
  }, [dispatch, address])

  useEffect(() => {
    if (addresses) {
      addresses.forEach((address) => {
        dispatch(generateDiograph(address))
      })
    }
  }, [dispatch, addresses])
}
