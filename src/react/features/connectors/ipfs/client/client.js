import Ipfs from 'ipfs'

import { getDiograph } from './getDiograph'
import { saveDiograph } from './saveDiograph'

let ipfs = null

export async function startIpfs() {
  if (ipfs) {
    console.log('IPFS already started')
  } else if (window.ipfs && window.ipfs.enable) {
    console.log('Found window.ipfs')
    ipfs = await window.ipfs.enable({ commands: ['id'] })
  } else {
    try {
      console.time('IPFS Started')
      ipfs = await Ipfs.create()
      console.timeEnd('IPFS Started')
      console.log(await ipfs.id())
      return true
    } catch (error) {
      console.error('IPFS init error:', error)
      ipfs = null
      throw error
    }
  }
}

export function cleanupIpfs() {
  if (ipfs && ipfs.stop) {
    console.log('Stopping IPFS')
    ipfs.stop().catch((err) => console.error(err))
    ipfs = null
  }
}

export default {
  getDiograph: (address) => getDiograph(address, ipfs),
  saveDiograph: (diograph) => saveDiograph(diograph, ipfs),
}
