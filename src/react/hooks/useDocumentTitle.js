import { useEffect } from 'react'
import { useStore } from '../store'

export const useDocumentTitle = () => {
  const [{ diograph }] = useStore(state => state.diograph)
  const [{ path }] = useStore(state => state.navigation)
  useEffect(() => {
    document.title = path
      .map(id => diograph[id])
      .map(({ id, text }) => text || id)
      .join(' / ')
  }, [path, diograph])
}
