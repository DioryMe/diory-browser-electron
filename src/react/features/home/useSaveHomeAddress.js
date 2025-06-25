import { useDispatchActions } from '../../store'

import { saveHomeAddress } from './homeActions'

import { getLocalAddress } from '../../utils/getLocalAddress'

const getHomeAddress = async () => {
  if (window.processEnv.TESTCAFE_TEST) {
    return `${window.processEnv.PWD}/tmp`
  }

  return getLocalAddress()
}

export const useSaveHomeAddress = () => {
  const { dispatch } = useDispatchActions()
  return {
    saveHomeAddress: async () => {
      const address = await getHomeAddress()
      if (address) {
        dispatch(saveHomeAddress(address))
      }
    },
  }
}
