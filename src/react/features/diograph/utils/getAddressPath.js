export const getAddressPath = (address) => address && address.split('/').slice(0, -1).join('/')
