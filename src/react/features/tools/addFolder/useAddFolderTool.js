import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useCreateDiory } from '../createDiory/useCreateDiory'

import { createLink, setDiographAddress } from '../../diograph/diographActions'
import { getLocalAddress } from '../../../utils/getLocalAddress'

import { buttons, BUTTON } from './buttons'
import { inactivateButton } from '../../buttons/buttonsActions'

export const useAddFolderTool = () => {
  useButtons(buttons)

  const createDiory = useCreateDiory()

  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    async function action() {
      const folderPath = await getLocalAddress()
      if (folderPath) {
        // TODO Generate diograph from folderPath
        const { id } = createDiory({ text: folderPath }, folderPath)
        dispatch(createLink({ id: 'folders' }, { id }))
        dispatch(setDiographAddress(folderPath))
      }
    }

    if (BUTTON === active) {
      action()
      dispatch(inactivateButton())
    }
  }, [dispatch, active])
}
