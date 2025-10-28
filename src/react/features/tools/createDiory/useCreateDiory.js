import { useDispatchActions } from '../../../store'
import { createDiory } from '../../diograph/diographActions'
import { getDefaultImage } from '../../diograph/utils/getDefaultImage'

export const useCreateDiory = () => {
  const { dispatch } = useDispatchActions()
  return (dioryObject) => {
    const image = getDefaultImage()
    const { key, diory } = dispatch(createDiory({ image, ...dioryObject }))
    return { key, ...diory }
  }
}
