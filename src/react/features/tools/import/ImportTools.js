import React from 'react'

import { useDispatchActions, useStore } from '../../../store'

import { IMPORT_TOOLS } from './buttons'

import { buttons as createButtons } from '../create/buttons'
import { buttons as folderButtons } from '../folder/buttons'

import ImportView from './ImportView'
import Diory from '../../../components/diories/Diory'
import { activateButton, inactivateButton } from '../../buttons/buttonsActions'

const useImportTools = () => {
  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => dispatch(activateButton(diory.id)),
    onDone: () => dispatch(inactivateButton()),
    onCancel: () => dispatch(inactivateButton()),
  }
}

const ImportTools = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { onClick, onDone, onCancel } = useImportTools()

  return IMPORT_TOOLS === active ? (
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
  ) : null
}

export default ImportTools
