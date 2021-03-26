import { useStore, useDispatch } from '../../../store'
import { setOpen, setInactive } from '../../buttons/actions'
import { goBackward, setSelectedLink } from '../../navigation/actions'
import { deleteDiory, deleteLinks } from '../../diograph/actions'

// - halutaanko poistaa diory vai nou
//   - jos halutaan poistaa diory, niin focusDiory.id === linkDiory.id

// - jos halutaan poistaa itseen linkattu?
//   - tsekataan onko itseen yhtään linkkiä?
//     - jos on niin poistetaan vain se
//     - jos ei, niin poistetaan diory

// - jos halutaan poistaa diory
//   - omat linkit menee automaattisesti, kun poistaa dioryn
//   - mitä reverse linkkejä on?
//     => missä nämä selvitetään? reducerissa?!!?

// - jos halutaan poistaa linkki
//   - sitten on vain yksi
//   - dispatch(deleteLinks([linkki])

const useReverseLinkedDiories = (focusDiory, diograph) => {
  return Object.values(diograph)
    .map((diory) => {
      return Object.entries(diory.links || {}).filter(([, { id }]) => id === focusDiory.id)[0]
        ? {
            fromDiory: diograph[diory.id],
            toDiory: diograph[focusDiory.id],
          }
        : null
    })
    .filter(Boolean)
}

const useDeletedLinks = (focusDiory, linkDiory) => {
  const [{ diograph }] = useStore((state) => state.diograph)

  const linkedDiories = Object.values(focusDiory.links || []).map(({ id }) => ({
    fromDiory: diograph[focusDiory.id],
    toDiory: diograph[id],
  }))

  return linkedDiories.concat(useReverseLinkedDiories(focusDiory, diograph))
}

const useIsFocusDeleted = (focusDiory, linkDiory) => {
  // TODO: Check if it has link to itself and if has => return false
  return focusDiory && linkDiory ? focusDiory.id === linkDiory.id : false
}

export const useDeleteView = (focusDiory, linkDiory) => {
  const isFocusDeleted = useIsFocusDeleted(focusDiory, linkDiory)
  const [deletedDiory, deletedLinks] = isFocusDeleted
    ? [focusDiory, useDeletedLinks(focusDiory, linkDiory)]
    : [null, [{ fromDiory: focusDiory, toDiory: linkDiory }]]

  const resetView = () => {
    dispatch(setInactive())
    dispatch(setSelectedLink())
    dispatch(setOpen(false))
  }

  const dispatch = useDispatch()
  return {
    deletedDiory,
    deletedLinks,
    deleteDioryAndLinks: () => {
      dispatch(deleteLinks(deletedLinks))

      if (deletedDiory) {
        dispatch(deleteDiory(deletedDiory))
        dispatch(goBackward())
      }

      resetView()
    },
    resetView,
  }
}
