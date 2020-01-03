import React from 'react'
import { useStore } from '../../store'
import { useLenses } from '../lenses/hooks'
import { useOperations } from './hooks'
import OperationButton from './OperationButton'

const useOperationsBar = () => {
  const { active, onSelect, onClear } = useOperations()
  const [{ selectedLensId }] = useStore(state => state.lenses)
  const { operations } = useLenses()

  let buttons = []
  if (selectedLensId){
    buttons = operations[selectedLensId]
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
    <>
      { buttons.map(button => <OperationButton {...button} />)}
    </>
  )
}

export default OperationsBar
