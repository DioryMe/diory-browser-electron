const { getHomeDiograph } = require('./getHomeDiograph')
const { settingsStore } = require('./utils')

jest.mock('./utils')

const someDiograph = { '/': { id: '/', text: 'home' } }

describe('getHomeDiograph', () => {
  it('returns stored diograph', async () => {
    settingsStore.mockImplementation(() => ({
      get: () => someDiograph,
    }))
    await expect(getHomeDiograph()).resolves.toEqual({ diograph: someDiograph })
  })

  it('returns undefined diograph when nothing stored', async () => {
    settingsStore.mockImplementation(() => ({
      get: () => undefined,
    }))
    await expect(getHomeDiograph()).resolves.toEqual({ diograph: undefined })
  })
})
