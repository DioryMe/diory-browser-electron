import { useEffect, useMemo } from 'react'

import { useDispatchActions } from '../../store'
import { getDiograph } from './diographActions'
import { useDiograph } from './useDiograph'

import { getDiosphereAddress } from './utils/getDiosphereAddress'
import { getAddressPath } from './utils/getAddressPath'

const unique = (item, index, array) => array.indexOf(item) === index

const useMemoryAddresses = () => {
  const { story } = useDiograph()
  return useMemo(
    () =>
      story.links &&
      story.links
        .map(({ id }) => getDiosphereAddress(story.address, id))
        .map(getAddressPath)
        .map((path) => `${path}/`)
        .filter(unique),
    [story.id]
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
