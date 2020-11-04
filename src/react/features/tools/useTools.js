import { useDispatch, useStore } from '../../store'

import { useDeleteTool } from './delete/useDeleteTool'
import { useUpdateTool } from './update/useUpdateTool'

export const useTools = () => {
  const [{ active }] = useStore((state) => state.buttons)
  const { onUpdateDiory } = useUpdateTool()
  const { onDeleteDiory } = useDeleteTool()

  const dispatch = useDispatch()
  return {
    onClick: ({ diory }) => {
      onUpdateDiory({ diory })
      onDeleteDiory({ diory })
    }
  }
}