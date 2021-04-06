const csvtojson = require('csvtojson')
jest.mock('csvtojson')

const { readCsvFileToJson } = require('./readCsvFileToJson')

describe('readCsvFileToJson', () => {
  it('reads csv file and converts it to json', async () => {
    const mockFromFile = jest.fn()
    csvtojson.mockImplementation(() => ({
      fromFile: mockFromFile,
    }))

    await readCsvFileToJson('./activities.csv')

    expect(mockFromFile).toHaveBeenCalledWith('./activities.csv')
  })
})
