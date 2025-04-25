import { useEffect, useMemo } from 'react'

import { useDispatchActions } from '../../store'
import { getDiograph } from './diographActions'
import { useDiories } from './utils/useDiories'

import { getDiographKey } from './utils/getDiographKey'
import { getKeyPath } from './utils/getKeyPath'

const unique = (item, index, array) => array.indexOf(item) === index

const useMemoryAddresses = () => {
  const { story = {} } = useDiories()
  return useMemo(
    () =>
      story.links &&
      story.links
        .map(({ id } = {}) => getDiographKey(story.key, id))
        .map(getKeyPath)
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
