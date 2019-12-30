import { useEffect } from 'react'
import { useStore } from '../../store'
import { goSide, goBackward } from './actions'

export const useDocumentTitle = () => {
  const [{ diograph }] = useStore(state => state.room)
  const [{ path }] = useStore(state => state.navigation)
  useEffect(() => {
    document.title = ['Home'].concat(path
      .map(id => diograph[id])
      .filter(diory => !!diory)
      .map(({ id, text }) => text || id)
    ).join(' / ')
  }, [path, diograph])
}

export const useParent = () => {
  const [{ backward }] = useStore(state => state.navigation)
  const [{ diograph }] = useStore(state => state.room)
  if (!backward.length) {
    return null
  }
  const parentId = backward[0][1]
  return diograph[parentId]
}

export const useSiblings = () => {
  const parent = useParent()
  if (!parent) {
    return []
  }
  return Object.values(parent.links).map(({ id }) => id)
}

export const useLeft = () => {
  const sibligns = useSiblings()
  const [{ focus }, dispatch] = useStore(state => state.navigation)
  if (!sibligns.length) {
    return {}
  }
  const focusIndex = sibligns.indexOf(focus)
  if (focusIndex === 0) {
    return {}
  }
  const leftSibling = sibligns[focusIndex-1]
  return {
    onLeft: () => dispatch(goSide({ focus: leftSibling }))
  }
}

export const useRight = () => {
  const sibligns = useSiblings()
  const [{ focus }, dispatch] = useStore(state => state.navigation)
  if (!sibligns.length) {
    return {}
  }
  const focusIndex = sibligns.indexOf(focus)
  if (focusIndex === sibligns.length - 1) {
    return {}
  }
  const rightSibling = sibligns[focusIndex+1]
  return {
    onRight: () => dispatch(goSide({ focus: rightSibling }))
  }
}
