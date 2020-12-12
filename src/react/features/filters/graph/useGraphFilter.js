import { useStore } from '../../../store'

function getLinkIds({ links }) {
  return Object.values(links).map(({ id }) => id)
}

function getArray(length) {
  return [...Array(length-1).keys()]
}

export const useGraphFilter = () => {
  const [{ diograph }] = useStore((state) => state.diograph)
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ filters }] = useStore((state) => state.filters)

  const diory = diograph[focus]
  return !!filters.graph && !!diory && getArray(filters.graph)
    .reduce((dioryIds) => (
      dioryIds.reduce((array, id) => ([
        ...array,
        ...getLinkIds(diograph[id]),
      ]), dioryIds)
    ), getLinkIds(diory))
}
