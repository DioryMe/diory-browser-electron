import { useDispatchActions } from '../../store'

import { resetStore } from '../../store/actions'
import { setRoomAddress } from './roomActions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const useChooseDioryFolderLocation = () => {
  const { dispatch } = useDispatchActions()
  return (result) => {
    const dioryFolderPath = result.filePaths[0]
    invokeChannel(channels.SET_DIORY_FOLDER_LOCATION, dioryFolderPath).then(({ address }) => {
      dispatch(resetStore())
      dispatch(setRoomAddress(address))
    })
  }
}

export const useSetHomeAddress = () => {
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
