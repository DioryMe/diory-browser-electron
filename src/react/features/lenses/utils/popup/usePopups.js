import { useDioryPopup } from './useDioryPopup'
import { useLinkPopups } from './useLinkPopups'
import { useTogglePopup } from './useTogglePopup'
import { useUpdatePopup } from './useUpdatePopup'

export const usePopups = (ref, { dioryMarker, linkMarkers }, diory, diorys) => {
  useDioryPopup(dioryMarker, diory)
  useLinkPopups(linkMarkers, diorys)
  useUpdatePopup(ref)
  useTogglePopup(ref)
}
