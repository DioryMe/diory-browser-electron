import { getAddressPath } from './getAddressPath'

export const getDiory = (diosphereAddress, diograph) => {
  if (diosphereAddress && diosphereAddress.endsWith('/') && diograph[diosphereAddress]) {
    const diospherePath = getAddressPath(diosphereAddress)
    const dioryId = diograph[diosphereAddress].id
    const rootAddress = `${diospherePath}/${dioryId}`
    return { address: rootAddress, ...diograph[rootAddress] }
  }

  return { address: diosphereAddress, ...diograph[diosphereAddress] }
}
