import { useEffect, useMemo } from 'react'

import { useDispatchActions } from '../../store'
import { getDiograph } from './diographActions'
import { useStoryDiories } from './utils/useDiories'

import { resolveLinkKey } from './utils/resolveLinkKey'
import { getKeyPath } from './utils/getKeyPath'
import { unique } from '../../utils/unique'

const useMemoryAddresses = () => {
  const { story = {} } = useStoryDiories()
  return useMemo(
    () =>
      story.links &&
      story.links
        .map(({ id } = {}) => resolveLinkKey(story.key, id))
        .map(getKeyPath)
        .filter(Boolean)
        .map((path) => `${path}/`)
        .filter(unique),
    [story.key]
  )
}

export const useDiographEffect = () => {
  const addresses = useMemoryAddresses()

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (addresses) {
      addresses.forEach((address) => {
        dispatch(getDiograph(address))
      })
    }
  }, [dispatch, addresses])
}
