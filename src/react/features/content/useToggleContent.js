import { useDispatchActions, useSelector } from '../../store'
import { toggleContent } from './contentActions'

export const useToggleContent = () => {
  const { content } = useSelector((state) => state.content)

  const { dispatch } = useDispatchActions()
  return {
    toggleContent: () => content && dispatch(toggleContent()),
  }
}
