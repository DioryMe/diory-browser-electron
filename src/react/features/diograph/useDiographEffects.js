import { useGetDiographEffect } from './useGetDiographEffect'
import { useSaveDiographEffect } from './useSaveDiographEffect'

export const useDiographEffects = () => {
  useGetDiographEffect()
  useSaveDiographEffect()
}
