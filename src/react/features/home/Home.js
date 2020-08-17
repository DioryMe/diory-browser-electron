import { useGetHomeEffect } from './effects/useGetHomeEffect'
import { useSaveHomeEffect } from './effects/useSaveHomeEffect'

const Home = () => {
  useGetHomeEffect()
  useSaveHomeEffect()

  return null
}

export default Home
