import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../../store'

import { useButtons } from '../../../buttons/useButtons'

import { setDiographAddress } from '../../../diograph/diographActions'
import { getLocalAddress } from '../../../../utils/getLocalAddress'
import { inactivateButton } from '../../../buttons/buttonsActions'

import { buttons, BUTTON } from './buttons'
import { selectStory } from '../../../navigation/navigationActions'
import { addHomeFolder, setIsHome } from '../../../home/homeActions'

export const useAddFolderTool = () => {
  useButtons(buttons)

  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    async function action() {
      const folderPath = await getLocalAddress()
      if (folderPath) {
        await dispatch(addHomeFolder(folderPath))

        dispatch(setIsHome(false))
        dispatch(setDiographAddress(folderPath, false))
        dispatch(selectStory({ key: '/' }))
      }
    }

    if (BUTTON === active) {
      action()
      dispatch(inactivateButton())
    }
  }, [dispatch, active])
}
