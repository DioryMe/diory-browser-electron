import { useDioryPopup } from './useDioryPopup'
import { useLinkPopups } from './useLinkPopups'
import { useTogglePopup } from './useTogglePopup'
import { useUpdatePopup } from './useUpdatePopup'

export const usePopups = (ref, { dioryMarker, linkMarkers }, diory, memories) => {
  useDioryPopup(dioryMarker, diory)
  useLinkPopups(linkMarkers, memories)
  useUpdatePopup(ref)
  useTogglePopup(ref)
}
