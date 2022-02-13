import { useCallback, useState } from 'react'
import { convertToFileUrl } from '../../utils'

export const getContentUrl = (diory, baseUrl) => {
  const { data = [] } = diory
  const { contentUrl } = (data && data[0]) || {}
  return convertToFileUrl(contentUrl, baseUrl)
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
