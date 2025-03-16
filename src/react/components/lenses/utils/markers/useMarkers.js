import { useDioryMarker } from './useDioryMarker'
import { useLinkMarkers } from './useLinkMarkers'

export const useMarkers = (ref, dioryLocationData, linksLocationData) => {
  return {
    dioryMarker: useDioryMarker(ref, dioryLocationData),
    linkMarkers: useLinkMarkers(ref, linksLocationData),
  }
}
