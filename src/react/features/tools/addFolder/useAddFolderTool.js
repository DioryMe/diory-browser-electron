import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'

import { createLink, getDiograph } from '../../diograph/diographActions'
import { getLocalAddress } from '../../../utils/getLocalAddress'

import { buttons, BUTTON } from './buttons'
import { inactivateButton } from '../../buttons/buttonsActions'

export const useAddFolderTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    async function action() {
      const folderPath = await getLocalAddress()
      if (folderPath) {
        dispatch(createLink({ id: 'folders' }, { key: folderPath }))
        dispatch(getDiograph(folderPath))
      }
    }

    if (BUTTON === active) {
      dispatch(inactivateButton())
      action()
    }
  }, [dispatch, active])
}
