import toBuffer from 'it-to-buffer'
import all from 'it-all'

async function resolveCid(ipfs, address) {
  if (address.startsWith('/ipns/')) {
    const [cid] = await all(ipfs.name.resolve(address))
    return cid
  }
  return address
}

async function ipfsCat(ipfs, cid) {
  const buffer = await toBuffer(ipfs.cat(cid))
  return JSON.parse(buffer.toString())
}

export async function getDiograph(ipfs, address) {
  console.log('-------------')
  console.log('IPFS client getDiograph request:', address)
  const cid = await resolveCid(ipfs, address)
  const ipfsDiograph = await ipfsCat(ipfs, cid)

  const diograph = {}
  await Promise.all(
    Object.entries(ipfsDiograph).map(async ([id, dioryCid]) => {
      diograph[id] = await ipfsCat(ipfs, dioryCid)
    })
  )
  console.log('-------------')
  console.log('IPFS client getDiograph response:', diograph)
  return diograph
}

async function publishToIpns(ipfs, cid) {
  const { name } = await ipfs.name.publish(cid)
  return name
}

export async function saveDiograph(ipfs, diograph) {
  console.log('-------------')
  console.log('IPFS client saveDiograph request:', diograph)

  const ipfsDiograph = {}
  await Promise.all(
    Object.entries(diograph).map(async ([id, diory]) => {
      const { cid } = await ipfs.add(JSON.stringify(diory))
      ipfsDiograph[id] = `/ipfs/${cid.toString()}`
    })
  )
  const { cid } = await ipfs.add(JSON.stringify(ipfsDiograph))
  const ipnsCid = await publishToIpns(ipfs, cid)

  console.log('-------------')
  console.log('IPFS client saveDiograph response:', `/ipns/${ipnsCid}`)
  return `/ipns/${ipnsCid}`
}
