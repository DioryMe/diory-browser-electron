import { useCallback, useState } from 'react'
import { getContentUrlFromCID } from '../../utils'

export const getContentUrl = (diory, baseUrl) => {
  const { data = [] } = diory
  const { contentUrl, encodingFormat } = (data && data[0]) || {}
  return getContentUrlFromCID(contentUrl, encodingFormat)
}

export const getUrl = (diory) => {
  const { data = [] } = diory
  const { url } = (data && data[0]) || {}
  return url
}

export const useContentElement = () => {
  const [contentElement, setContentElement] = useState({})
  const refCallback = useCallback((element) => {
    setContentElement(element)
  }, [])

  return {
    contentElement,
    refCallback,
  }
}
