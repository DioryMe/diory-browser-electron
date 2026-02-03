import { useSelectStory } from './actions/selectStory/useSelectStory'

export const useOnDioryClick = () => {
  const selectStory = useSelectStory()

  return ({ diory }) => {
    switch (true) {
      default:
        selectStory({ diory })
    }
    // Delete
    // Link
    // Create
    // ...
  }
}
