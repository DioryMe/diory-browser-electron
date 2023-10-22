import GET_DIOGRAPH from './GET_DIOGRAPH.json'

export function getDiograph(params) {
  const mockResponse = GET_DIOGRAPH
  console.log('mock: getDiograph', params, mockResponse)

  return mockResponse
}

export function saveDiograph(params) {
  const mockResponse = true
  console.log('mock: saveDiograph', params, mockResponse)

  return mockResponse
}

export function getDiosphere(params) {
  const mockResponse = GET_DIOGRAPH
  console.log('mock: getDiosphere', params, mockResponse)

  return mockResponse
}
