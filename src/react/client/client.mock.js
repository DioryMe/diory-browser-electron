import GET_HOME_ADDRESS from './mockResponses/GET_HOME_ADDRESS.json'
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
    GET_HOME_ADDRESS,
  }
}

export const mockResponses = {
  ...mockChannels(),
  showOpenDiolog,
}
