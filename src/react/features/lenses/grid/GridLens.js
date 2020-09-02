import React from 'react'
import { useDispatch, useStore } from '../../../store'
import { useButtons } from '../../buttons'
import { useFocusDiory } from '../../room/hooks'

import { setFocus, setLink } from '../../navigation/actions'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Diory from '../../../components/diories/Diory'
import CreateTool from './tools/create/CreateTool'
import UpdateTool from './tools/update/UpdateTool'

import buttons, { UPDATE_TOOL_BUTTON } from './buttons/buttons'

const resolveAction = (dispatch, activeButton) => ({ diory }) => {
  switch (activeButton) {
    case UPDATE_TOOL_BUTTON:
      dispatch(setLink(diory))
      return
    default:
      dispatch(setFocus({ focus: diory.id }))
  }
}

const addAAttrValue = (obj, attr, value) => ({
  ...(obj && { ...obj, [attr]: { ...obj[attr], ...value } }),
})

const useGridLens = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const dispatch = useDispatch()
  const { diory, diorys } = useFocusDiory()
  return {
    diory: {
      ...diory,
      style: addAAttrValue(diory.style, 'text', active && { cursor: 'pointer' }),
    },
    onClick: resolveAction(dispatch, active),
    diorys: diorys.map((diory) => ({
      diory: addAAttrValue(diory, 'style', active && { cursor: 'pointer' }),
      onClick: resolveAction(dispatch, active),
    })),
  }
}

const MAX_NUMBER_OF_DIORYS_PER_VIEW = 100

const GridLens = () => {
  useButtons(buttons)
  const { diory, onClick, diorys } = useGridLens()
  return (
    <>
      <BackgroundDiory diory={diory} onClick={onClick}>
        {diorys.slice(0, MAX_NUMBER_OF_DIORYS_PER_VIEW).map(({ diory, onClick }) => (
          <Diory
            key={diory.id}
            diory={diory}
            onClick={onClick}
            flex="1 0 360px"
            height={240}
            padding={24}
            elevation={2}
            alignSelf="center"
            color="white"
            fontWeight="bold"
            aria-controls={`panel-${diory.id}`}
          />
        ))}
      </BackgroundDiory>
      <CreateTool />
      <UpdateTool />
    </>
  )
}

GridLens.diory = {
  text: 'Grid',
  image: 'grid-view',
}

export default GridLens
