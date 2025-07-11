import { useDispatchActions } from '../../store'

import { openButtons, inactivateButton } from './buttonsActions'
import { useSidePanel } from '../sidePanel/useSidePanel'
import { clearSelectedDiories } from '../tools/toolsActions'

export const useOpenButtons = () => {
  const { openSidePanel } = useSidePanel('bottom')
  const { dispatch } = useDispatchActions()
  return {
    openButtons: () => {
      dispatch(openButtons())
      openSidePanel()
    },
  }
}

export const useCloseButtons = () => {
  const { closeSidePanel } = useSidePanel('bottom')
  const { dispatch } = useDispatchActions()
  return {
    closeButtons: () => {
      dispatch(inactivateButton())
      dispatch(clearSelectedDiories())
      closeSidePanel()
    },
  }
}
