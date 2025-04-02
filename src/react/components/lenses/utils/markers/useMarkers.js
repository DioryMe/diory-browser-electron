import { useDioryMarker } from './useDioryMarker'
import { useLinkMarkers } from './useLinkMarkers'

export const useMarkers = (ref, dioryLocationData, linksLocationData) => ({
  dioryMarker: useDioryMarker(ref, dioryLocationData),
  linkMarkers: useLinkMarkers(ref, linksLocationData),
})
