import { convertToFileUrl } from './convertToFileUrl'

let address
let fileUrl

describe('convertToFileUrl', () => {
  beforeEach(() => {
    address = '/Users/Jouni/My Diories/2004-2013/My Diory'
    fileUrl =
      'file:///Users/Jouni/My%20Diories/2004-2013/My%20Diory/NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
  })

  it('relative path', () => {
    const relativePath = 'NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    expect(convertToFileUrl(relativePath, address)).toEqual(fileUrl)
  })

  it('absolute path', () => {
    const absolutePath =
      '/Users/Jouni/My Diories/2004-2013/My Diory/NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    expect(convertToFileUrl(absolutePath, address)).toEqual(fileUrl)
  })

  it('url', () => {
    const url = 'https://google.com'
    expect(convertToFileUrl(url, address)).toEqual(url)
  })

  it('data', () => {
    const dataUrl =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8Van4HwAGngKVn65TsQAAAABJRU5ErkJggg=='
    expect(convertToFileUrl(dataUrl, address)).toEqual(dataUrl)
  })

  it('demo', () => {
    const demoContentUrl =
      'diory-demo-content/NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    const localhostUrl = `http://localhost:3300/${demoContentUrl}`
    expect(convertToFileUrl(demoContentUrl, address)).toEqual(localhostUrl)
  })

  it('undefined relativePath returns undefined', () => {
    expect(convertToFileUrl(undefined, address)).toEqual(undefined)
  })

  it('undefined address returns relativePath', () => {
    const relativePath = 'NewFolderToBeImported/2004-07-Ilosaarirock/026_24A.JPG'
    expect(convertToFileUrl(relativePath, undefined)).toEqual(relativePath)
  })
})
