import { getAddressPath } from './getAddressPath'

export const getDiosphereAddress = (parentAddress, address) => {
  const parentPath = getAddressPath(parentAddress)

  const addressParts = address.split('/')
  if (addressParts.length === 1) {
    return `${parentPath}/${address}`
  }

  if (address.startsWith('/')) {
    return `${parentPath}${address}`
  }

  return address
}
