import { isDefaultImage } from './getDefaultImage'

export const includedInLinks = ({ links = [] } = {}, diory = {}) =>
  links.map(({ id }) => id).includes(diory.key) || links.map(({ id }) => id).includes(diory.id)

export const includesDiory = (diories, diory) => diories.map(({ key }) => key).includes(diory.key)

export const findImage = (diories) =>
  diories
    .map(({ image }) => image)
    .filter(Boolean)
    .find((image) => !isDefaultImage(image))
