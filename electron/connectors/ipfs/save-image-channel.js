const Ipfs = require('ipfs')
const { readFileSync } = require('fs')
const { ipcMain } = require('electron')

const { channels } = require('../../../src/shared/constants')

let ipfs = null

async function startIpfs() {
  if (ipfs) {
    console.log('IPFS already started')
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

ipcMain.on(channels.IPFS_SAVE_IMAGE, (event, address) => {
  console.log('IPFS_SAVE_IMAGE', address)
  const file = readFileSync(address)
  if (!ipfs) {
    startIpfs()
  }
  ipfs.add(file).then(({ cid }) => {
    const image = `/ipfs/${cid.toString()}`
    console.log(image)
    event.reply(channels.IPFS_SAVE_IMAGE, image)
  })

})

exports.startIpfs = startIpfs