import { useEffect } from 'react'
import { useDispatchActions, useSelector } from '../../../store'

import { useButtons } from '../../buttons/useButtons'
import { useDiories } from '../../diograph/utils/useDiories'

import { createLink, getDiograph } from '../../diograph/diographActions'
import { getLocalAddress } from '../../utils/getLocalAddress'

import { buttons, BUTTON } from './buttons'
import { inactivateButton } from '../../buttons/buttonsActions'

export const useCreateLinkTool = () => {
  useButtons(buttons)

  const { story } = useDiories()
  const { active } = useSelector((state) => state.buttons)

  const { dispatch } = useDispatchActions()
  useEffect(() => {
    async function action() {
      const folderPath = await getLocalAddress()
      if (folderPath) {
        dispatch(createLink(story, { key: folderPath }))
        dispatch(getDiograph(folderPath))
      }
    }

    if (BUTTON === active) {
      dispatch(inactivateButton())
      action()
    }
  }, [active, story])
}
