import * as mockApi from '../apis/electronApi.mock'
import * as api from '../apis/electronApi'

import * as client from './diographClient'

export const roomClient = (api) => ({
  ...client,
  getDiograph: client.getDiograph(api),
  saveDiograph: client.saveDiograph(api),
})

export function createClient() {
  const _api = process.env.NODE_ENV === 'development' ? mockApi : api
  return roomClient(_api)
}
