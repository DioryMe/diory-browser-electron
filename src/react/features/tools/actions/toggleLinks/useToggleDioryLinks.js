import { useDispatchActions } from '../../../../store'

import { createLink, deleteLink } from '../../../diograph/diographActions'

import { includedInLinks } from '../../../diograph/utils/dioryUtils'

export const useToggleDioryLinks = () => {
  const { dispatch } = useDispatchActions()
  return (diory, linkedDiory) => {
    !includedInLinks(diory, linkedDiory)
      ? dispatch(createLink(diory, linkedDiory))
      : dispatch(deleteLink(diory, linkedDiory))
  }
}
