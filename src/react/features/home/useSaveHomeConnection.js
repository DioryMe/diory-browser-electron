import { useDispatchActions } from '../../store'

import { saveHomeConnection } from './homeActions'

const getHomeConnection = async () => {
  if (window.processEnv.TESTCAFE_TEST) {
    return `${window.processEnv.PWD}/tmp`
  }

  const { filePaths } = await window.channelsApi.showOpenDialog()
  return `LocalClient/${filePaths[0]}`
}

export const useSaveHomeConnection = () => {
  const { dispatch } = useDispatchActions()
  return {
    onClick: async () => {
      const connection = await getHomeConnection()
      dispatch(saveHomeConnection(connection))
    },
  }
}
