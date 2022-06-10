import GET_DIOGRAPH from '../client/mockResponses/GET_DIOGRAPH.json'

export function getDiograph() {
  const mockResponse = GET_DIOGRAPH
  console.log('mock: getDiograph', mockResponse)

  return mockResponse
}

export function saveDiograph() {
  const mockResponse = true
  console.log('mock: saveDiograph', mockResponse)

  return mockResponse
}
