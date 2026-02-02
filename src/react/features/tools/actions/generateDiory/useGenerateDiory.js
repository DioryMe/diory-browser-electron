import { useDispatchActions } from '../../../../store'
import { generateDiory } from '../../../diograph/diographActions'

export const useGenerateDiory = () => {
  const { dispatch } = useDispatchActions()
  return async (address) => dispatch(generateDiory(address))
}
