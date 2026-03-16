import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'
import { useCreateDiory } from '../createDiory/useCreateDiory'
import { useGenerateDiory } from '../generateDiory/useGenerateDiory'

import { createLink, setDiographAddress } from '../../../diograph/diographActions'
import { getLocalAddress } from '../../../../utils/getLocalAddress'
import { inactivateButton } from '../../../buttons/buttonsActions'

import { buttons, BUTTON } from './buttons'

export const useAddFolderTool = () => {
  useButtons(buttons)

  const generateDiory = useGenerateDiory()
  const createDiory = useCreateDiory()

  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    async function action() {
      const folderPath = await getLocalAddress()
      if (folderPath) {
        const { diory, key } = await generateDiory(folderPath)
        createDiory(diory, folderPath)

        dispatch(createLink({ id: 'folders' }, { key, ...diory }))
      }
    }

    if (BUTTON === active) {
      action()
      dispatch(inactivateButton())
    }
  }, [dispatch, active])
}
