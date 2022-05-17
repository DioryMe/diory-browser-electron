import { createDiory, deleteDiory } from './diographReducer'
import diographFixture from '../tools/delete/deleteViewFixtureDiograph'

let act
let payload
let diograph

beforeEach(() => {
  diograph = JSON.parse(JSON.stringify(diographFixture))
})

describe('createDiory', () => {
  beforeEach(() => {
    act = () => createDiory({ diograph }, { payload })
  })

  describe('creates one diory', () => {
    beforeEach(() => {
      payload = { diory: { id: 'someNewDioryId', text: 'Some new diory', links: {} } }
    })

    it('works', () => {
      const returnValue = act()
      expect(returnValue.diograph.someNewDioryId).toBeDefined()
      diograph.someNewDioryId = payload.diory
      expect(JSON.stringify(returnValue)).toEqual(JSON.stringify({ diograph, updated: true }))
    })
  })
})

describe('deleteDiory', () => {
  beforeEach(() => {
    act = () => deleteDiory({ diograph }, { payload })
  })

  describe('removes a diory', () => {
    beforeEach(() => {
      payload = { diory: { id: 'someDioryId' } }
    })

    it('works', () => {
      const returnValue = act()
      expect(returnValue.diograph.someDioryId).not.toBeDefined()
      delete diograph.someDioryId
      expect(JSON.stringify(returnValue)).toEqual(JSON.stringify({ diograph, updated: true }))
    })
  })
})
