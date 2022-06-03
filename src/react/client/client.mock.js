import GET_DIORY_FOLDER_LOCATION from './mockResponses/GET_DIORY_FOLDER_LOCATION.json'
import { channels } from '../../shared/constants'

const showOpenDiolog = () => {
  if (window.processEnv.TESTCAFE_TEST === '1') {
    return `${window.processEnv.PWD}/public/diory-demo-content`
  }

  if (window.processEnv.TESTCAFE_TEST === '2') {
    return `${window.processEnv.PWD}/electron/readers/example-folder`
  }
}

const mockChannels = () => {
  if (process.env.NODE_ENV !== 'development') {
    return {}
  }

  return {
    ...channels,
    GET_DIORY_FOLDER_LOCATION,
  }
}

export const mockResponses = {
  ...mockChannels(),
  showOpenDiolog,
}
