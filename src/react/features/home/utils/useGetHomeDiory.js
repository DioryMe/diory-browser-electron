import { useSelector } from 'react-redux'

export const useGetHomeDiory = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { address } = useSelector((state) => state.home)
  return {
    getHomeDiory: (id) => {
      const key = `${address}${id}`
      const diory = diograph[key]
      return diory ? { key, ...diory } : undefined
    },
  }
}
