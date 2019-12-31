import { useStore } from '../store'
import { useDiorys } from './useDiorys'

export const useDiory = (id) => {
  const [{ diograph }] = useStore(state => state.room)
  const diory = diograph[id]
  const links = diory && diory.links
  return {
    diory,
    diorys: useDiorys(links)
  }
}
