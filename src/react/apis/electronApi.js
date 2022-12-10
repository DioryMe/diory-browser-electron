export function getDiograph(address) {
  console.log('electronApi/getDiograph', address)

  return window.channelsApi.GET_DIOGRAPH(address)
}

export function saveDiograph(params) {
  console.log('electronApi/saveDiograph', params)

  // TODO: Debounce
  return window.channelsApi.SAVE_DIOGRAPH(params)
}
