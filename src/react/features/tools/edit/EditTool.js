import React from 'react'

import { useStore } from '../../../store'
import { useEditButtons } from './useEditButtons'
import { useEditView } from './useEditView'

import EditView from './EditView'

import { EDIT_TOOL_BUTTON } from './buttons'

export const EditTool = () => {
  useEditButtons()
  const [{ active }] = useStore((state) => state.tools)
  const props = useEditView()

  return EDIT_TOOL_BUTTON === active ?
    <EditView
      {...props}
      isShown={active}
    /> : null
}

export default EditTool
