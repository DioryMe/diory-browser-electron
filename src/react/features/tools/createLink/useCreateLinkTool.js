import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useEffect } from 'react'
import { useDiograph } from '../../diograph/useDiograph'

import { createLink } from '../../diograph/diographActions'
import { getFolderPath } from './getFolderPath'

import { buttons, BUTTON } from './buttons'
import { inactivateButton } from '../../buttons/buttonsActions'

export const useCreateLinkTool = () => {
  useButtons(buttons)

  const { story } = useDiograph()
  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    async function action() {
      const folderPath = await getFolderPath()
      if (folderPath) {
        dispatch(createLink(story, { key: folderPath }))
      }
      dispatch(inactivateButton())
    }

    if (BUTTON === active) {
      action()
    }
  }, [active, story])
}
