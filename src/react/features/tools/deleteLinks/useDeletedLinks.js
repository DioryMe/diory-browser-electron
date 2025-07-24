import { useStoryDiories } from '../../diograph/utils/useDiories'
import { useSelectedDiories } from '../useSelectedDiories'

const mapToLinks = (diory, links) =>
  links.map((link) => ({
    fromDiory: diory,
    toDiory: link,
  }))

export const useDeletedLinks = () => {
  const { story } = useStoryDiories()
  const { selectedDiories } = useSelectedDiories()
  return mapToLinks(story, selectedDiories)
}
