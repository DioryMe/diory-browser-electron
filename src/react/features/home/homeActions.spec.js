import { DioryClient } from '@diory/client-js'

import { toggleHomeDiory, isDioryInDiograph } from './homeActions'

const HOME_ADDRESS = 'LocalClient//Users/test/HomeFolder/'
const OTHER_ADDRESS = 'LocalClient//Users/test/OtherFolder/'

const buildHomeDiograph = () => ({
  diory: { id: 'diory', text: 'Home', image: 'home.jpg' },
  [`${HOME_ADDRESS}diory`]: {
    id: 'diory',
    created: '2026-01-01T00:00:00.000Z',
    modified: '2026-01-01T00:00:00.000Z',
  },
  folders: { id: 'folders' },
})

describe('isDioryInDiograph', () => {
  it('returns true when the id exists in the diograph', () => {
    expect(isDioryInDiograph('a', { a: { id: 'a' } })).toBe(true)
  })

  it('returns false when the id does not exist', () => {
    expect(isDioryInDiograph('a', { b: { id: 'b' } })).toBe(false)
  })
})

describe('toggleHomeDiory', () => {
  let diographClient
  const dispatch = jest.fn()

  const getState = () => ({
    home: { diograph: buildHomeDiograph() },
    diograph: { address: OTHER_ADDRESS },
  })

  beforeEach(() => {
    diographClient = new DioryClient([])
    diographClient.addDiograph(HOME_ADDRESS, {})
  })

  it('does nothing if no home folder is connected', async () => {
    const getStateNoHome = () => ({
      home: { diograph: { diory: { id: 'diory' }, folders: { id: 'folders' } } },
      diograph: { address: OTHER_ADDRESS },
    })

    await toggleHomeDiory({ id: 'photo1', date: '2026-07-15T10:00:00.000Z' })(
      dispatch,
      getStateNoHome,
      { diographClient }
    )

    expect(diographClient.getDiograph(HOME_ADDRESS).toObject()).toEqual({})
  })

  it('adds a diory and links it to its month/year/timeline diories', async () => {
    const diory = { id: 'photo1', text: 'Photo', date: '2026-07-15T10:00:00.000Z' }

    await toggleHomeDiory(diory)(dispatch, getState, { diographClient })

    const result = diographClient.getDiograph(HOME_ADDRESS).toObject()

    expect(result.photo1).toBeDefined()
    expect(result['2026-07'].links).toEqual([{ id: 'photo1' }])
    expect(result['2026'].links).toEqual([{ id: '2026-07' }])
    expect(result.timeline.links).toEqual([{ id: '2026' }])
  })

  it('removes an already-toggled-in diory', async () => {
    const diory = { id: 'photo1', text: 'Photo', date: '2026-07-15T10:00:00.000Z' }
    await toggleHomeDiory(diory)(dispatch, getState, { diographClient })

    await toggleHomeDiory(diory)(dispatch, getState, { diographClient })

    const result = diographClient.getDiograph(HOME_ADDRESS).toObject()
    expect(result.photo1).toBeUndefined()
  })

  it('resolves a relative contentUrl against the diograph it was toggled from', async () => {
    const diory = {
      id: 'photo1',
      date: '2026-07-15T10:00:00.000Z',
      data: [{ contentUrl: '/photo1.jpg', encodingFormat: 'image/jpeg' }],
    }

    await toggleHomeDiory(diory)(dispatch, getState, { diographClient })

    const result = diographClient.getDiograph(HOME_ADDRESS).toObject()
    expect(result.photo1.data[0].contentUrl.startsWith('file:///Users/test/OtherFolder/')).toBe(
      true
    )
  })
})
