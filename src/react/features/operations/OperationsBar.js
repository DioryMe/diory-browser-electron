import React, { useState } from 'react'
import { useStore } from '../../store'
import { useLenses } from '../lenses/hooks'
import { useOperations } from './hooks'
import OperationButton from './OperationButton'

const useOperationsBar = () => {
  const [open, setOpen] = useState(false)
  const { active, onSelect, onClear } = useOperations()
  const [{ selectedLensId }] = useStore(state => state.lenses)
  const { operationButtons } = useLenses()

  let buttons = []
  if (selectedLensId) {
    buttons = operationButtons[selectedLensId]
  }
  const clearAndClose = () => {
    onClear()
    setOpen(false)
  }

  return {
    tools: !open && buttons.length > 1,
    showButtons: () => setOpen(true),
    buttons: buttons.map(button => ({
      ...button,
      key: button.id,
      active: button.id === active,
      onClick: () =>
        button.id === active ? clearAndClose() : onSelect(button.id),
    })),
  }
}

const OperationsBar = () => {
  const { tools, showButtons, buttons } = useOperationsBar()
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1000,
        bottom: 0,
        cursor: 'pointer',
        left: 0,
        padding: 8,
      }}
    >
      {tools && (
        <OperationButton
          id="tools"
          data={{ icon: 'wrench' }}
          onClick={showButtons}
        />
      )}
      {!tools && buttons.map(button => <OperationButton {...button} />)}
    </div>
  )
}

export default OperationsBar
