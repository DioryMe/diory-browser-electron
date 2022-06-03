import * as mockClient from './diograph/diographClient.mock'
import * as client from './diograph/client'

export function createClient() {
  if (process.env.NODE_ENV === 'development') {
    return {
      ...client,
      ...mockClient,
    }
  }

  return client
}
