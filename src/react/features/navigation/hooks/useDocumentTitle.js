import { useEffect } from 'react'
import { useSelector } from '../../../store'

export const useDocumentTitle = () => {
  const { diograph = {} } = useSelector((state) => state.diograph)
  const { path } = useSelector((state) => state.navigation)
  useEffect(() => {
    document.title = ['Home']
      .concat(
        path
          .map((id) => diograph[id])
          .filter((diory) => !!diory)
          .map(({ id, text }) => text || id)
      )
      .join(' / ')
  }, [path, diograph])
}
