import { openChannel } from '../../../../client/client'
import { channels } from '../../../../../shared/constants'

function addImage(image) {
  return openChannel(channels.IPFS_SAVE_IMAGE, image)
}

async function publishToIpns(cid, ipfs) {
  const { name } = await ipfs.name.publish(cid)
  return name
}

export async function saveDiograph(diograph, ipfs) {
  console.log('-------------')
  console.log('IPFS client saveDiograph request:', diograph)

  const ipfsDiograph = {}
  for(const [id, diory] of Object.entries(diograph)) {
    if (diory.image) {
      if (diory.image.includes('/Users/')) {
        diory.image = await addImage(diory.image)
      }
      if (diory.image.startsWith('https://gateway.ipfs.io')) {
        diory.image = diory.image.slice(23)
      }
    }

    const { cid } = await ipfs.add(JSON.stringify(diory))
    ipfsDiograph[id] = `/ipfs/${cid.toString()}`
  }
  console.log('ipfsDiograph', ipfsDiograph)

  const { cid } = await ipfs.add(JSON.stringify(ipfsDiograph))

  console.log('Diograph ipfs:', `/ipfs/${cid}`)

  const ipnsCid = await publishToIpns(cid, ipfs)

  console.log('-------------')
  console.log('IPFS client saveDiograph response:', `/ipns/${ipnsCid}`)
  return `/ipns/${ipnsCid}`
}
