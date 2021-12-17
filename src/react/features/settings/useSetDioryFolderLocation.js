import { useDispatchActions } from '../../store'

import { resetStore } from '../../store/actions'
import { setDioryFolderLocation } from './settingsActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const useChooseDioryFolderLocation = () => {
  const { dispatch } = useDispatchActions()
  return (result) => {
    const dioryFolderPath = result.filePaths[0]
    invokeChannel(channels.SET_DIORY_FOLDER_LOCATION, dioryFolderPath).then(
      ({ dioryFolderLocation }) => {
        dispatch(resetStore())
        dispatch(setDioryFolderLocation(dioryFolderLocation))
      }
    )
  }
}

export const useSetDioryFolderLocation = () => {
  const chooseDioryFolderLocation = useChooseDioryFolderLocation()

  return {
    onClick: () => {
      if (window.processEnv.TESTCAFE_TEST) {
        const path = `${window.processEnv.PWD}/tmp`
        const result = { filePaths: [path] }
        chooseDioryFolderLocation(result)
      } else {
        window.channelsApi.showOpenDialog().then((result) => {
          chooseDioryFolderLocation(result)
        })
      }
    },
  }
}
