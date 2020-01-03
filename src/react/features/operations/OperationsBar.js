import React from 'react'
import { useStore } from '../../store'
import { useLenses } from '../lenses/hooks'
import { useOperations } from './hooks'
import OperationButton from './OperationButton'

const useOperationsBar = () => {
  const { active, onSelect, onClear } = useOperations()
  const [{ selectedLensId }] = useStore(state => state.lenses)
  const { operationButtons } = useLenses()

  let buttons = []
  if (selectedLensId){
    buttons = operationButtons[selectedLensId]
  }

  return {
    buttons: buttons.map(button => ({
      ...button,
      key: button.id,
      active: button.id === active,
      onClick: () => button.id === active ? onClear() : onSelect(button.id)
    }))
  }
}

const OperationsBar = () => {
  const { buttons } = useOperationsBar()
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
      { buttons.map(button => <OperationButton {...button} />)}
    </div>
  )
}

export default OperationsBar
