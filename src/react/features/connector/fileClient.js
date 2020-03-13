export const fetchFile = channel => {
  // TODO: Find good place for static data
  const data = {
    GET_HOME: require('../../../home.json'),
    GET_ROOM: require('../../../diograph.json'),
  }[channel]

  if (!data) {
    return Promise.reject()
  }

  return Promise.resolve(data)
}
