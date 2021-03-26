import { createDiory, deleteDiory, deleteLink, deleteLinks } from './reducers'
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

describe('deleteLinks', () => {
  beforeEach(() => {
    act = () => deleteLinks({ diograph }, { payload })
  })

  describe('removes two links', () => {
    beforeEach(() => {
      payload = [
        { fromDiory: { id: 'someDioryId', links: {} }, toDiory: { id: 'linkedDioryId1' } },
        {
          fromDiory: { id: 'someDioryId', links: {} },
          toDiory: { id: 'bidirectionalLinkedDioryId3' },
        },
      ]
    })

    it('works', () => {
      const returnValue = act()
      expect(returnValue.diograph.someDioryId.links.linkedDioryId1).not.toBeDefined()
      expect(returnValue.diograph.someDioryId.links.bidirectionalLinkedDioryId3).not.toBeDefined()
      delete diograph.someDioryId.links.linkedDioryId1
      delete diograph.someDioryId.links.bidirectionalLinkedDioryId3
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
