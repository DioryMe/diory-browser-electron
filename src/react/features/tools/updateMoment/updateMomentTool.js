// import { useDispatchActions, useSelector } from '../../../store'
//
// import { useButtons } from '../../buttons/useButtons'
// import { useSelectedDiories } from '../useSelectedDiories'
//
// import { createDiory, createLink, updateDiory } from '../../diograph/diographActions'
// import { clearSelectedDiories } from '../toolsActions'
// import { inactivateButton } from '../../buttons/buttonsActions'
//
// import { buttons, UPDATE_MOMENT_TOOL_BUTTON } from './buttons'
// import { useCreateDiory } from '../createDiory'
//
// const useGetOrCreateDiory = () => () => {}
//
// const useCreateDioryWithLink = () => {
//   const { dispatch } = useDispatchActions()
//   return (diory, linkedDiory) => {}
// }
//
// // Create moment diory if not exist
// // Add selectedDiory to links
// // Remove selectedDiory from links
//
// export const updateMomentTool = () => {
//   useButtons(buttons)
//
//   const { active } = useSelector((state) => state.buttons)
//
//   const { updateSelectedDiories } = useUpdateSelectedDiories()
//   const createDiory = useCreateDiory()
//
//   const { dispatch } = useDispatchActions()
//   return (diory, selectedDiory) => {
//     if (UPDATE_MOMENT_TOOL_BUTTON === active) {
//       if (diograph[diory.id]) {
//         createDiory(diory)
//       }
//       const { diory } = dispatch(createDiory({ image, ...newDiory }))
//       dispatch(createLink(story, diory))
//
//       updateSelectedDiories(diory)
//       dispatch(inactivateButton())
//     }
//   }
// }
