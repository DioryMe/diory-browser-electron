export const fetchFile = channel => {
  // TODO: Find good place for static data
  const data = {
    GET_HOME: require('./mockResponses/home.json'),
    GET_ROOM: require('./mockResponses/diograph.json'),
  }[channel]

  if (!data) {
    return Promise.reject()
  }

  return Promise.resolve(data)
}
