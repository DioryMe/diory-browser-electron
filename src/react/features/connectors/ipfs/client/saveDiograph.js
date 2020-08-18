async function publishToIpns(cid, ipfs) {
  const { name } = await ipfs.name.publish(cid)
  return name
}

export async function saveDiograph(diograph, ipfs) {
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
  const ipnsCid = await publishToIpns(cid, ipfs)

  console.log('-------------')
  console.log('IPFS client saveDiograph response:', `/ipns/${ipnsCid}`)
  return `/ipns/${ipnsCid}`
}
