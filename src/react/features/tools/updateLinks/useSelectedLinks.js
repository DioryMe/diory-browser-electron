import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useSelectedDiories } from '../utils/useSelectedDiories'

const mapToLinks = (diory, links) =>
  links.map((link) => ({
    fromDiory: diory,
    toDiory: link,
  }))

export const useSelectedLinks = () => {
  const { story } = useStoryDiories()
  const { selectedDiories } = useSelectedDiories()
  return mapToLinks(story, selectedDiories)
}
