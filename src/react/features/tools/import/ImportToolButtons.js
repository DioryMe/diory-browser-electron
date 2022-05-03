import React from 'react'

import { useDispatchActions, useSelector } from '../../../store'

import { selectTool } from '../toolsActions'
import { inactivateButton } from '../../buttons/buttonsActions'

import ImportView from './ImportView'
import Diory from '../../../components/diories/Diory'

import { buttons as createButtons } from '../create/buttons'
import { buttons as folderButtons } from '../folder/buttons'

const useImportTools = () => {
  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => dispatch(selectTool(diory.id)),
    onDone: () => dispatch(inactivateButton()),
    onCancel: () => dispatch(inactivateButton()),
  }
}

const ImportTools = () => {
  const { active } = useSelector((state) => state.buttons)
  const { onClick, onCancel, onDone } = useImportTools()

  return (
    <ImportView onDone={onDone} onCancel={onCancel}>
      {[...createButtons, ...folderButtons].map((button) => (
        <Diory
          key={button.id}
          diory={button}
          flex="1 0 360px"
          height={240}
          padding={24}
          alignSelf="center"
          onClick={onClick}
        />
      ))}
    </ImportView>
  )
}

export default ImportTools
