import React from 'react'
import { useDispatch, useStore } from '../../../store'
import { useFocusDiory } from '../../room/hooks'

import BackgroundDiory from '../../../components/diories/BackgroundDiory'
import Diory from '../../../components/diories/Diory'

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
    diorys: diorys.map((linkDiory) => ({
      diory: addAAttrValue(linkDiory, 'style', active && { cursor: 'pointer' }),
    })),
  }
}

const MAX_NUMBER_OF_DIORYS_PER_VIEW = 100

const GridView = () => {
  const { diory, onClick, diorys } = useGridLens()
  return (
    <BackgroundDiory diory={diory} gradient onClick={onClick}>
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
  )
}

export default GridView
