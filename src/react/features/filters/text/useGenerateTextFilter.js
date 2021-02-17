import { useFilter } from '../hooks/useFilter'

export const useGenerateTextFilter = () => {
  const { active, query = '' } = useFilter('text')
  return ({ text }) =>
    !active || !query || (!!text && text.toLowerCase().includes(query.toLowerCase()))
}
