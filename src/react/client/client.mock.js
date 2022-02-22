import GET_DIORY_FOLDER_LOCATION from './mockResponses/GET_DIORY_FOLDER_LOCATION.json'
import GET_DIOGRAPH from './mockResponses/GET_DIOGRAPH.json'
import { channels } from '../../shared/constants'

export const mockResponse = (channel) => {
  const data = {
    ...channels,
    GET_DIOGRAPH,
    GET_DIORY_FOLDER_LOCATION,
  }[channel]

  if (!data) {
    return Promise.reject()
  }

  return Promise.resolve(data)
}
