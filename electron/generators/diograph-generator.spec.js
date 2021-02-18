const { getFileAndSubfolderPaths } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')
const { generateDiograph } = require('./diograph-generator')
const { isEmpty } = require('../lib/utils')

jest.mock('../readers/folder-reader')
jest.mock('./diory-generator')

describe('diograph-generator', () => {
  let act

  describe('generateDiograph', () => {
    let folderPath
    let paths
    let folderDiory

    describe('given responses', () => {
      beforeEach(() => {
        paths = {}
        folderDiory = {}
        act = async () => {
          function mockedGenerateDioryFromFolder(folderPath, dioryLinks = {}) {
            const dioryFromFolder = { id: folderDiory.id }
            if (!isEmpty(dioryLinks)) {
              dioryFromFolder.links = dioryLinks
            }
            return dioryFromFolder
          }
          getFileAndSubfolderPaths.mockResolvedValue({})
          getFileAndSubfolderPaths.mockResolvedValueOnce(paths)
          generateDioryFromFile.mockResolvedValue()
          generateDioryFromFolder.mockReturnValue(folderDiory)
          generateDioryFromFolder.mockImplementationOnce(mockedGenerateDioryFromFolder)
          return generateDiograph(folderPath)
        }
      })

      it('renders with empty responses', async () => {
        folderPath = 'undefined string'
        await act()
      })

      describe('given a folderPath', () => {
        beforeEach(() => {
          folderPath = 'some-folderPath'
        })

        it('generates folder diory', async () => {
          await act()

          expect(generateDioryFromFolder).toHaveBeenCalledWith('some-folderPath', {})
        })

        describe('given folder diory has id', () => {
          beforeEach(() => {
            folderDiory.id = 'some-folderDiory-id'
          })

          it('adds folder diory to diograph with id as key', async () => {
            const { diograph } = await act()

            expect(diograph['some-folderDiory-id']).toStrictEqual({ id: 'some-folderDiory-id' })
          })
        })

        describe('given folder diory does not have id', () => {
          it('does not add folder diory to diograph', async () => {
            const { diograph } = await act()

            expect(Object.keys(diograph).length).toEqual(0)
          })
        })

        it('reads file and subfolder paths from folder', async () => {
          await act()

          expect(getFileAndSubfolderPaths).toHaveBeenCalledWith('some-folderPath')
        })

        const testCases = [
          {
            filePaths: ['some-file'],
          },
          {
            filePaths: ['first-file', 'second-file'],
          },
          {
            subfolderPaths: ['some-subfolder'],
          },
          {
            subfolderPaths: ['first-subfolder', 'second-subfolder'],
          },
          {
            filePaths: ['some-file'],
            subfolderPaths: ['some-subfolder'],
          },
          {
            filePaths: ['first-file', 'second-file'],
            subfolderPaths: ['first-subfolder', 'second-subfolder'],
          },
        ]

        testCases.forEach(({ filePaths = [], subfolderPaths = [] }) => {
          describe(`given folder has ${filePaths.length} files and ${subfolderPaths.length} subfolders`, () => {
            beforeEach(() => {
              paths = { filePaths, subfolderPaths }
            })

            it('generates file diorys', async () => {
              await act()

              filePaths.forEach((file) => {
                expect(generateDioryFromFile).toHaveBeenCalledWith(file)
              })
            })

            it('generates subfolder diorys', async () => {
              await act()

              subfolderPaths.forEach((subfolder) => {
                expect(generateDioryFromFolder).toHaveBeenCalledWith(subfolder, {})
              })
            })

            describe('given diorys have ids', () => {
              beforeEach(() => {
                filePaths.forEach((fileDiory) => {
                  generateDioryFromFile.mockReturnValueOnce({ id: `${fileDiory}-id` })
                })
                subfolderPaths.forEach((subfolderDiory) => {
                  function mockedGenerateDioryFromFolder(folderPath, dioryLinks = {}) {
                    const dioryFromFolder = { id: `${subfolderDiory}-id` }
                    if (!isEmpty(dioryLinks)) {
                      dioryFromFolder.links = dioryLinks
                    }
                    return dioryFromFolder
                  }
                  generateDioryFromFolder.mockImplementationOnce(mockedGenerateDioryFromFolder)
                })
              })

              it('adds diorys to diograph with id as key', async () => {
                const { diograph } = await act()
                const diorys = [...filePaths, ...subfolderPaths]
                diorys.forEach((diory) => {
                  expect(diograph[`${diory}-id`]).toStrictEqual({ id: `${diory}-id` })
                })
              })

              describe('given folder diory has id', () => {
                beforeEach(() => {
                  folderDiory.id = 'some-folderDiory-id'
                })

                it('adds links from folder diory to diorys with file name as key', async () => {
                  const { diograph } = await act()

                  filePaths.forEach((file) => {
                    expect(diograph['some-folderDiory-id'].links[file]).toStrictEqual({
                      id: `${file}-id`,
                    })
                  })
                  subfolderPaths.forEach((subfolder) => {
                    expect(diograph['some-folderDiory-id'].links[subfolder]).toStrictEqual({
                      id: `${subfolder}-id`,
                    })
                  })
                })
              })
            })

            describe('given folder diory does not have id', () => {
              it('does not add subfolder diorys to diograph', async () => {
                const { diograph } = await act()

                expect(Object.keys(diograph).length).toEqual(0)
              })
            })
          })
        })
      })
    })
  })
})
