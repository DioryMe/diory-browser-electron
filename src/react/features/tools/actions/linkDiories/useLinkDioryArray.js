import { useDispatchActions } from '../../../../store'

import { createLink } from '../../../diograph/diographActions'

import { includedInLinks } from '../../../diograph/utils/dioryUtils'

export const useLinkDioryArray = () => {
  const { dispatch } = useDispatchActions()
  return (diories) =>
    diories.forEach((diory, index, array) => {
      const parentDiory = array[index + 1]
      if (parentDiory && !includedInLinks(parentDiory, diory)) {
        dispatch(createLink(parentDiory, diory))
      }
    })
}
