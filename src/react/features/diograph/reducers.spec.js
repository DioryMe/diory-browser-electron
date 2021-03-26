import { createDiory, deleteDiory, deleteLink } from './reducers'
import diograph from '../tools/delete/deleteViewFixtureDiograph'

let act
let payload

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

describe('deleteLink', () => {
  beforeEach(() => {
    act = () => deleteLink({ diograph }, { payload })
  })

  describe('removes one link', () => {
    beforeEach(() => {
      payload = { fromDiory: { id: 'someDioryId', links: {} }, toDiory: { id: 'linkedDioryId1' } }
    })

    it('works', () => {
      const returnValue = act()
      expect(returnValue.diograph.someDioryId.links.linkedDioryId1).not.toBeDefined()
      delete diograph.someDioryId.links.linkedDioryId1
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
