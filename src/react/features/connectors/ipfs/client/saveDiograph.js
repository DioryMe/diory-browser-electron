import { openChannel } from '../../../../client/client'
import { channels } from '../../../../../shared/constants'

function addImage(image) {
  console.log(image)
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
  for(const [id, { image, ...diory }] of Object.entries(diograph)) {
    if (image) {
      diory.image = await addImage(image)
    }

    const { cid } = await ipfs.add(JSON.stringify(diory))
    ipfsDiograph[id] = `/ipfs/${cid.toString()}`
  }
  console.log('ipfsDiograph', ipfsDiograph)

  const { cid } = await ipfs.add(JSON.stringify(ipfsDiograph))
  const ipnsCid = await publishToIpns(cid, ipfs)

  console.log('-------------')
  console.log('IPFS client saveDiograph response:', `/ipns/${ipnsCid}`)
  return `/ipns/${ipnsCid}`
}
