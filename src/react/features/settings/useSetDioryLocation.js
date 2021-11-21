import { useDispatchActions } from '../../store'

import { resetStore } from '../../store/actions'
import { selectStory } from '../navigation/actions'
import { getDiograph } from '../diograph/actions'
import { setDioryLocation } from './actions'

import { invokeChannel } from '../../client/client'
import { channels } from '../../../shared/constants'

const useChooseDioryFolderLocation = () => {
  const { dispatch } = useDispatchActions()

  return (result) => {
    const diographFolderPath = result.filePaths[0]
    invokeChannel(channels.CHOOSE_FOLDER_LOCATION, diographFolderPath).then(
      ({ diograph, rootId, folderLocation }) => {
        dispatch(resetStore())
        dispatch(setDioryLocation(folderLocation))
        dispatch(getDiograph(diograph, rootId, folderLocation))
        dispatch(selectStory({ id: rootId }))
      }
    )
  }
}

export const useSetDioryLocation = () => {
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
