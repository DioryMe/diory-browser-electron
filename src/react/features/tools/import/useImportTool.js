import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../store'
import { useButtons } from '../../buttons/useButtons'

import { importDiograph } from '../../diograph/diographActions'

import { buttons, BUTTON } from './buttons'
import { invokeChannel } from '../../../client/client'
import { inactivateButton } from '../../buttons/buttonsActions'

export const useImportTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)
  const { dispatch } = useDispatchActions()
  useEffect(() => {
    if (BUTTON === active) {
      const importDiographEffect = async () => {
        const { filePaths } = await invokeChannel('showOpenDialog')

        dispatch(importDiograph({ address: filePaths[0], client: 'LocalClient' }))
        dispatch(inactivateButton())
      }
      importDiographEffect()
    }
  }, [dispatch, active])
}
