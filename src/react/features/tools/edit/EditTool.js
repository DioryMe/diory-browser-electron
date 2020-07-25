import React from 'react'

import { useStore } from '../../../store'
import { useEditButtons } from './useEditButtons'
import { useEditView } from './useEditView'

import EditView from './EditView'

import { EDIT_TOOL_BUTTON } from './buttons'

const EditTool = () => {
  useEditButtons()
  const [{ active }] = useStore((state) => state.tools)
  const props = useEditView()
  const isShown = EDIT_TOOL_BUTTON === active

  return isShown ? <EditView {...props} isShown={isShown} /> : null
}

export default EditTool
