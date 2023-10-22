import { useDispatchActions } from '../../store'

import { saveHome } from './homeActions'

const getHomeAddress = async () => {
  if (window.processEnv.TESTCAFE_TEST) {
    return `${window.processEnv.PWD}/tmp`
  }

  const { filePaths } = await window.channelsApi.showOpenDialog()
  return filePaths[0]
}

export const useSaveHome = () => {
  const { dispatch } = useDispatchActions()
  return {
    onClick: async () => {
      const address = await getHomeAddress()
      dispatch(saveHome(address))
    },
  }
}
