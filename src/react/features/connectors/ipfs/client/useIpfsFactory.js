import { useEffect, useState } from 'react'
import { cleanupIpfs, startIpfs } from './client'

export function useIpfsFactory() {
  const [isIpfsReady, setIpfsReady] = useState(false)
  const [ipfsInitError, setIpfsInitError] = useState(null)
  useEffect(() => {
    startIpfs().then(setIpfsReady).catch(setIpfsInitError)

    return function () {
      cleanupIpfs()
      setIpfsReady(false)
    }
  }, [])

  return { isIpfsReady, ipfsInitError }
}
