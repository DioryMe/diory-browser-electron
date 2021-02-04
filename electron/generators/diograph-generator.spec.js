const { getFileAndSubfolderPaths } = require('../readers/folder-reader')
const { generateDioryFromFile, generateDioryFromFolder } = require('./diory-generator')
const { generateDiograph } = require('./diograph-generator')

jest.mock('../readers/folder-reader')
jest.mock('./diory-generator')

describe('diograph-generator', () => {
  let act

  describe('generateDiograph', () => {
    let folderPath
    let paths
    let folderDiory

    it('renders with undefined values', async () => {
      await generateDiograph()
    })

    describe('given responses', () => {
      beforeEach(() => {
        paths = {}
        folderDiory = {}
        act = async () => {
          getFileAndSubfolderPaths.mockResolvedValue({})
          getFileAndSubfolderPaths.mockResolvedValueOnce(paths)
          generateDioryFromFile.mockResolvedValue()
          generateDioryFromFolder.mockReturnValue(folderDiory)
          return generateDiograph(folderPath)
        }
      })

      it('renders with empty responses', async () => {
        await act()
      })

      describe('given a folderPath', () => {
        beforeEach(() => {
          folderPath = 'some-folderPath'
        })

        it('generates folder diory', async () => {
          await act()

          expect(generateDioryFromFolder).toHaveBeenCalledWith('some-folderPath', [])
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
            files: ['some-file'],
          },
          {
            files: ['first-file', 'second-file'],
          },
          {
            subfolders: ['some-subfolder'],
          },
          {
            subfolders: ['first-subfolder', 'second-subfolder'],
          },
          {
            files: ['some-file'],
            subfolders: ['some-subfolder'],
          },
          {
            files: ['first-file', 'second-file'],
            subfolders: ['first-subfolder', 'second-subfolder'],
          },
        ]

        testCases.forEach(({ files = [], subfolders = [] }) => {
          describe(`given folder has ${files.length} files and ${subfolders.length} subfolders`, () => {
            beforeEach(() => {
              paths = { files, subfolders }
            })

            it('generates file diorys', async () => {
              await act()

              files.forEach((file) => {
                expect(generateDioryFromFile).toHaveBeenCalledWith(file)
              })
            })

            it('generates subfolder diorys', async () => {
              await act()

              subfolders.forEach((subfolder) => {
                expect(generateDioryFromFolder).toHaveBeenCalledWith(subfolder, [])
              })
            })

            describe('given diorys have ids', () => {
              beforeEach(() => {
                files.forEach((fileDiory) => {
                  generateDioryFromFile.mockReturnValueOnce({ id: `${fileDiory}-id` })
                })
                subfolders.forEach((subfolderDiory) => {
                  generateDioryFromFolder.mockReturnValueOnce({ id: `${subfolderDiory}-id` })
                })
              })

              it('adds diorys to diograph with id as key', async () => {
                const { diograph } = await act()
                const diorys = [...files, ...subfolders]
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

                  files.forEach((file) => {
                    expect(diograph['some-folderDiory-id'].links[file]).toStrictEqual({
                      id: `${file}-id`,
                    })
                  })
                  subfolders.forEach((subfolder) => {
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
