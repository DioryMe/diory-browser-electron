import { useTakeToDiory } from './actions/takeToDiory/useTakeToDiory'
import { useSelectDiory } from './actions/selectDiory/useSelectDiory'

export const useOnCheckboxClick = () => {
  const selectDiory = useSelectDiory()
  const takeToDiory = useTakeToDiory()

  return ({ diory }) => {
    switch (true) {
      case takeToDiory({ diory }):
        return true
      default:
        selectDiory({ diory })
    }
    // Delete
    // Link
    // ...
  }
}
