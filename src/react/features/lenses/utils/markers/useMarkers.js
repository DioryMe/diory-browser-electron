import { useDioryMarker } from './useDioryMarker'
import { useLinkMarkers } from './useLinkMarkers'

export const useMarkers = (ref, dioryLocationData, linksLocationData) => {
  const dioryMarker = useDioryMarker(ref, dioryLocationData)
  const linkMarkers = useLinkMarkers(ref, linksLocationData)

  return {
    dioryMarker,
    linkMarkers,
  }
}
