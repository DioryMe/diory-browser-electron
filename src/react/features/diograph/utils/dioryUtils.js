export const includedInLinks = ({ links = [] } = {}, diory) =>
  links.map(({ id }) => id).includes(diory.key)
export const includesDiory = (diories, diory) => diories.map(({ key }) => key).includes(diory.key)
