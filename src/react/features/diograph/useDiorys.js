import { useSelector } from '../../store'

export const useDiorys = (ids = {}) => {
  const { diograph = {} } = useSelector((state) => state.diograph)
  return Object.entries(ids)
    .map(([key, { id }]) => ({ key, ...diograph[id] }))
    .filter(({ id }) => id)
}
