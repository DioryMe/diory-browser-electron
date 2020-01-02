import React from 'react'
import { useOperations } from './hooks'
import OperationButton from './OperationButton'

const useOperationsBar = () => {
  const { active, onSelect, onClear } = useOperations()
  return {
    active,
    onClick: (operationId) => active ? onClear() : onSelect(operationId)
  }
}

const OperationsBar = () => {
  const { active, onClick } = useOperationsBar()
  return (
    <OperationButton active={active} onClick={onClick} />
  )
}

export default OperationsBar
