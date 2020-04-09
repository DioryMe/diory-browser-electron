import { useEffect, useRef } from 'react'

export const useCompare = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current !== value
}
