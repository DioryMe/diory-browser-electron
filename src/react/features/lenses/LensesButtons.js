import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useSidePanel } from '../sidePanel/useSidePanel'

import { selectLens } from './lensesActions'

import { MenuItem } from '../../components/menu/MenuItem'

import { graphLensButton } from './graph/GraphLens'
import { mapLensButton } from './map/MapLens'
import { searchLensButton } from './search/SearchLens'
import { timelineLensButton } from './timeline/button'

export const useActions = () => {
  const { selectedLensId } = useSelector((state) => state.lenses)
  const { openSidePanel, closeSidePanel } = useSidePanel('right')
  const { dispatch } = useDispatchActions()
  return {
    selectLens: ({ diory }) => {
      const newSelectedLensId = diory.id === selectedLensId ? null : diory.id
      dispatch(selectLens(newSelectedLensId))
      diory.id === selectedLensId ? closeSidePanel() : openSidePanel()
    },
  }
}

const useLensesButtons = () => {
  const { selectedLensId } = useSelector((state) => state.lenses)

  const buttons = [graphLensButton, mapLensButton, timelineLensButton, searchLensButton]

  return {
    buttons: Object.values(buttons).map(({ id, text, icon }) => ({
      diory: {
        id,
        icon,
        text: selectedLensId === id ? text : '',
      },
      isSelected: selectedLensId === id,
    })),
  }
}

const LensesButtons = () => {
  const { buttons } = useLensesButtons()
  const { selectLens } = useActions()
  return (
    <>
      {buttons.map(({ diory, isSelected }) => (
        <MenuItem key={diory.id} diory={diory} isSelected={isSelected} onClick={selectLens} />
      ))}
    </>
  )
}

export { LensesButtons }
