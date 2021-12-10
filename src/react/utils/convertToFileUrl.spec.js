import { convertToFileUrl } from './convertToFileUrl'

let dioryFolderLocation
let fileUrl

describe('convertToFileUrl', () => {
  beforeEach(() => {
    dioryFolderLocation = '/Users/Jouni/My Diories/2004-2013/My Diory'
    fileUrl =
      'file:///Users/Jouni/My%20Diories/2004-2013/My%20Diory/NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
  })

  it('relative path', () => {
    const relativePath = 'NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    expect(convertToFileUrl(relativePath, dioryFolderLocation)).toEqual(fileUrl)
  })

  it('absolute path', () => {
    const absolutePath =
      '/Users/Jouni/My Diories/2004-2013/My Diory/NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    expect(convertToFileUrl(absolutePath, dioryFolderLocation)).toEqual(fileUrl)
  })

  it('url', () => {
    const url = 'https://google.com'
    expect(convertToFileUrl(url, dioryFolderLocation)).toEqual(url)
  })

  it('data', () => {
    const dataUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8Van4HwAGngKVn65TsQAAAABJRU5ErkJggg=='
    expect(convertToFileUrl(dataUrl, dioryFolderLocation)).toEqual(dataUrl)
  })

  it('demo', () => {
    const demoContentUrl =
      'diory-demo-content/NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    const localhostUrl = `http://localhost:3300/${demoContentUrl}`
    expect(convertToFileUrl(demoContentUrl, dioryFolderLocation)).toEqual(localhostUrl)
  })

  it('undefined relativePath returns undefined', () => {
    expect(convertToFileUrl(undefined, dioryFolderLocation)).toEqual(undefined)
  })

  it('undefined dioryFolderLocation returns relativePath', () => {
    const relativePath = 'NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    expect(convertToFileUrl(relativePath, undefined)).toEqual(relativePath)
  })
})
