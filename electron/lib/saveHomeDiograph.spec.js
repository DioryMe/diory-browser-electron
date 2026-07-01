const { saveHomeDiograph } = require('./saveHomeDiograph')
const { settingsStore } = require('./utils')

jest.mock('./utils')

const someDiograph = { '/': { id: '/', text: 'home' } }

describe('saveHomeDiograph', () => {
  it('saves diograph to settingsStore and returns it', async () => {
    const set = jest.fn()
    settingsStore.mockImplementation(() => ({ set }))

    await expect(saveHomeDiograph({ diograph: someDiograph })).resolves.toEqual({ diograph: someDiograph })
    expect(set).toHaveBeenCalledWith('homeDiograph', someDiograph)
  })
})
