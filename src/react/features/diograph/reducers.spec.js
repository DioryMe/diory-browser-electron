import { deleteLink } from './reducers'
import diograph from '../tools/delete/deleteViewFixtureDiograph'

describe('deleteLink', () => {
  let act
  let payload

  beforeEach(() => {
    act = () => deleteLink({ diograph }, { payload })
  })

  describe('removes one link', () => {
    beforeEach(() => {
      payload = { diory: { id: 'someDioryId', links: {} }, link: { id: 'linkedDioryId1' } }
    })

    it('works', () => {
      const returnValue = act()
      expect(returnValue.diograph.someDioryId.links.linkedDioryId1).not.toBeDefined()
      delete diograph.someDioryId.links.linkedDioryId1
      expect(JSON.stringify(returnValue)).toEqual(JSON.stringify({ diograph, updated: true }))
    })
  })
})
