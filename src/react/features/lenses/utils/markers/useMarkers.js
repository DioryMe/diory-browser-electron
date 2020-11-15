import { useDioryMarker } from './useDioryMarker'
import { useLinkMarkers } from './useLinkMarkers'
import { useDragging } from './useDragging'

export const useMarkers = (ref, dioryLocationData, linksLocationData, enableDragging, onDragEnd) => {
  const dioryMarker = useDioryMarker(ref, dioryLocationData)
  const linkMarkers = useLinkMarkers(ref, linksLocationData)
  useDragging(ref, enableDragging, onDragEnd)

  return {
    dioryMarker,
    linkMarkers,
  }
}
