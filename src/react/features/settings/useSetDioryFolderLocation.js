import { useDispatchActions } from '../../store'

import { resetStore } from '../../store/actions'
import { setDioryFolderLocation } from './settingsActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const useChooseDioryFolderLocation = () => {
  const { dispatch } = useDispatchActions()
  return (result) => {
    const dioryFolderPath = result.filePaths[0]
    invokeChannel(channels.CHOOSE_FOLDER_LOCATION, dioryFolderPath).then(({ folderLocation }) => {
      dispatch(resetStore())
      dispatch(setDioryFolderLocation(folderLocation))
    })
  }
}

export const useSetDioryFolderLocation = () => {
  const chooseDioryFolderLocation = useChooseDioryFolderLocation()

  return {
    onClick: () => {
      if (window.processEnv.TESTCAFE_TEST === '1') {
        const path = `${window.processEnv.PWD}/tmp`
        const result = { filePaths: [path] }
        chooseDioryFolderLocation(result)
      } else if (window.processEnv.TESTCAFE_TEST === '2') {
        const path = `${window.processEnv.PWD}/tmp/test-my-diory`
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
