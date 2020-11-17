import { useEffect, useRef } from 'react'

export const useCompare = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current !== value
}

export const useInitial = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return !ref.current
}
