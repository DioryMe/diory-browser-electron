import { useEffect } from 'react'

const useKeyPress = (targetKey, handler) => {
  const keyPressHandler = ({ key }) => {
    if (key === targetKey) {
      handler()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyPressHandler)

    return () => {
      window.removeEventListener('keydown', keyPressHandler)
    }
  })
}

export default useKeyPress
