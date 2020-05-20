import GET_ROOM from './mockResponses/GET_ROOM.json'

export const mockResponse = (channel) => {
  const data = {
    GET_ROOM,
  }[channel]

  if (!data) {
    return Promise.reject()
  }

  return Promise.resolve(data)
}
