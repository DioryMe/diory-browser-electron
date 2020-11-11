import { useFocusTool } from './focus/useFocusTool'
import { useUpdateTool } from './update/useUpdateTool'
import { useDeleteTool } from './delete/useDeleteTool'

export const useTools = () => {
  const focusDiory = useFocusTool()
  const updateDiory = useUpdateTool()
  const deleteDiory = useDeleteTool()

  return ({ diory }) => {
    focusDiory({ diory })
    updateDiory({ diory })
    deleteDiory({ diory })
  }
}
