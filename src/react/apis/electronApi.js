export function getDiograph({ dioryFolderLocation }) {
  console.log('electronApi/getDiograph', dioryFolderLocation)

  return window.channelsApi.GET_DIOGRAPH(dioryFolderLocation)
}

export function saveDiograph(params) {
  console.log('electronApi/saveDiograph', params)

  // TODO: Debounce
  return window.channelsApi.SAVE_DIOGRAPH(params)
}