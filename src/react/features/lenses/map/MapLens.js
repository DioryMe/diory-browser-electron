import React from 'react'

import { useMap } from './hooks/useMap'
import { useMapBounds } from './hooks/useMapBounds'
import { useMapMarkers } from './hooks/useMapMarkers'
import { useSetFocus } from './hooks/useSetFocus'
import { useTogglePopup } from './hooks/useTogglePopup'

import CreateLocation from './tools/create/CreateLocation'
import UpdateLocation from './tools/update/UpdateLocation'
import DeleteLocation from './tools/delete/DeleteLocation'

const MapLens = ({ diory, diorys, activeButton, actions }) => {
  const id = 'mapId'
  const map = useMap(id)
  useMapBounds(map, diory, diorys)
  useMapMarkers(map, diory, diorys)
  useSetFocus(map, diory, activeButton)
  useTogglePopup(map, activeButton)

  return (
    <>
      <div id={id} style={{ height: '100%' }} />
      <CreateLocation map={map} diory={diory} activeButton={activeButton} actions={actions}/>
      <UpdateLocation map={map} activeButton={activeButton} actions={actions}/>
      <DeleteLocation map={map} diory={diory} activeButton={activeButton} actions={actions}/>
    </>
  )
}

export default MapLens
