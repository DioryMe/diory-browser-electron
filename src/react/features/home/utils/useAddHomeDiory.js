import { useDispatchActions } from '../../../store'

import { addHomeDiory } from '../homeActions'

import { getLocalAddress } from '../../../utils/getLocalAddress'

const getHomeFolderAddress = async () => {
  if (window.processEnv.TESTCAFE_TEST) {
    return `${window.processEnv.PWD}/tmp`
  }

  return getLocalAddress()
}

export const useAddHomeDiory = () => {
  const { dispatch } = useDispatchActions()
  return async () => {
    const address = await getHomeFolderAddress()
    if (address) {
      dispatch(addHomeDiory(address))
    }
  }
}
