import React from 'react'

import { useStore } from '../../../store'
import { useFocusDiory } from '../../room/hooks'

const MAX_NUMBER_OF_DIORYS_PER_VIEW = 100

const addAAttrValue = (obj, attr, value) => ({
  ...(obj && { ...obj, [attr]: { ...obj[attr], ...value } }),
})

const getDioryStyle = (obj, attr, active) => ({
  ...obj,
  ...addAAttrValue(obj, attr, active && { cursor: 'pointer' })
})

export const useGridLens = () => {
  const { diory, diorys } = useFocusDiory()
  const [{ active }] = useStore((state) => state.buttons)

  return {
    diory: { ...diory, ...getDioryStyle(diory.style, 'text', active) },
    diorys: diorys.slice(0, MAX_NUMBER_OF_DIORYS_PER_VIEW)
      .map((diory) => getDioryStyle(diory, 'style', active)),
  }
}