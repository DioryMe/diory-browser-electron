import { useSelector } from '../../store'

const getDiorys = (ids = {}, diograph = {}) =>
  Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)

export const getLinkedDiorys = (id, diograph) => {
  const diory = diograph[id]
  const links = diory && diory.links
  return getDiorys(links, diograph)
}

export const useDiograph = () => {
  return useSelector((state) => state.diograph)
}
