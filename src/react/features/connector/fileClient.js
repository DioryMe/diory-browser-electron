export const fetchFile = channel => {
  // TODO: Find good place for static data
  const data = {
    GET_HOME: require('./mockResponses/GET_HOME.json'),
    GET_ROOM: require('./mockResponses/GET_ROOM.json'),
  }[channel]

  if (!data) {
    return Promise.reject()
  }

  return Promise.resolve(data)
}
