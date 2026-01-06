import { useDispatchActions } from '../../../store'

import { saveHomeAddress } from '../homeActions'

import { getLocalAddress } from '../../../utils/getLocalAddress'
import { resetStore } from '../../../store/actions'

const getHomeAddress = async () => {
  if (window.processEnv.TESTCAFE_TEST) {
    return `${window.processEnv.PWD}/tmp`
  }

  return getLocalAddress()
}

export const useSaveHomeAddress = () => {
  const { dispatch } = useDispatchActions()
  return async () => {
    dispatch(resetStore())
    const address = await getHomeAddress()
    if (address) {
      dispatch(saveHomeAddress(address))
    }
  }
}
