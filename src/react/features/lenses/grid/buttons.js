export const CREATE_TOOL_BUTTON = 'CREATE_TOOL_BUTTON'
export const UPDATE_TOOL_BUTTON = 'UPDATE_TOOL_BUTTON'
export const DELETE_BUTTON = 'DELETE_BUTTON'

export const buttons = [
  {
    id: CREATE_TOOL_BUTTON,
    text: 'Create diory',
    data: {
      icon: 'plus',
      testid: 'create',
    },
  },
  {
    id: UPDATE_TOOL_BUTTON,
    text: 'Update diory',
    data: {
      icon: 'edit',
      testid: 'update',
    },
  },
  {
    id: DELETE_BUTTON,
    text: 'Delete diory or link',
    data: {
      icon: 'minus',
      testid: 'delete-link-button',
    },
  },
]
