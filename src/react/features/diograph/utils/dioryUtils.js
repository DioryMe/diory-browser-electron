import { getNonDefaultImage, getRandom } from './getDefaultImage'

export const includedInLinks = ({ links = [] } = {}, diory = {}) =>
  links.map(({ id }) => id).includes(diory.key) || links.map(({ id }) => id).includes(diory.id)

export const includesDiory = (diories, diory) => diories.map(({ key }) => key).includes(diory.key)

export const findImage = (diories) =>
  getRandom(diories.map(({ image }) => getNonDefaultImage(image)).filter(Boolean))
