import { useEffect } from 'react'
import { useDispatch, useStore } from '../../../store'
import { inactivateButton } from '../../buttons/actions'
import { addDiorys, createLinks } from '../../diograph/actions'

import { generateStravaDiorys } from './generateStravaDiorys'

import { stravaDiory } from './useStravaConnector'
import { STRAVA_BUTTON } from './buttons'

async function getStravaFilePath() {
  const {
    filePaths: [filePath],
  } = await window.nativeFileDialog.showOpenDialog({ properties: ['openFile'] })
  return { filePath }
}

export const useStravaButton = () => {
  const [{ active }] = useStore((state) => state.buttons)

  const dispatch = useDispatch()
  useEffect(async () => {
    if (STRAVA_BUTTON === active) {
      dispatch(inactivateButton())
      const { filePath } = await getStravaFilePath()
      const { diorys } = await generateStravaDiorys(filePath)
      dispatch(addDiorys(diorys))
      dispatch(createLinks({ id: stravaDiory.id }, diorys))
    }
  }, [active, dispatch])
}
