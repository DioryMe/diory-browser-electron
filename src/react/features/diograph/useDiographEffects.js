import { useGetDiographEffect } from './useGetDiographEffect'
import { useSaveDiographEffect } from './useSaveDiographEffect'
import { useSelectedStoryEffect } from './useSelectedStoryEffect'

export const useDiographEffects = () => {
  useGetDiographEffect()
  useSaveDiographEffect()
  useSelectedStoryEffect()
}
