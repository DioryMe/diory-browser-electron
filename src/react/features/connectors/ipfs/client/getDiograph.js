import toBuffer from 'it-to-buffer'
import all from 'it-all'

async function resolveCid(address, ipfs) {
  if (address.startsWith('/ipns/')) {
    const [cid] = await all(ipfs.name.resolve(address))
    return cid
  }
  return address
}

async function ipfsCat(cid, ipfs) {
  const buffer = await toBuffer(ipfs.cat(cid))
  return JSON.parse(buffer.toString())
}

export async function getDiograph(address, ipfs) {
  console.log('-------------')
  console.log('IPFS client getDiograph request:', address)
  const cid = await resolveCid(address, ipfs)
  const ipfsDiograph = await ipfsCat(cid, ipfs)

  const diograph = {}
  await Promise.all(
    Object.entries(ipfsDiograph).map(async ([id, dioryCid]) => {
      diograph[id] = await ipfsCat(dioryCid, ipfs)
    })
  )
  console.log('-------------')
  console.log('IPFS client getDiograph response:', diograph)
  return diograph
}
