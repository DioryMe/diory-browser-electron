import { useGetDiographEffect } from './useGetDiographEffect'
import { useSaveDiographEffect } from './useSaveDiographEffect'
import { useNavigationEffect } from './useNavigationEffect'

export const useDiographEffects = () => {
  useGetDiographEffect()
  useSaveDiographEffect()
  useNavigationEffect()
}
