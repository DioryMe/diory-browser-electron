import * as mockApi from '../apis/electronApi.mock'
import * as api from '../apis/electronApi'

export function createClient() {
  return process.env.NODE_ENV === 'development' ? mockApi : api
}
