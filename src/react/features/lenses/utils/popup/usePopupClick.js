import { useEffect } from 'react'

export const usePopupClick = (mapRef, onPopupClick) => {
  useEffect(() => {
    let diory
    const handleClick = () => onPopupClick(diory)
    if (mapRef.current) {
      mapRef.current.off('popupopen')
      mapRef.current.on('popupopen', (event) => {
        if (event.popup) {
          diory = event.popup.diory
          event.popup._wrapper.addEventListener('click', handleClick)
        }
      })
      mapRef.current.off('popupclose')
      mapRef.current.on('popupclose', (event) => {
        if (event.popup) {
          event.popup._wrapper.removeEventListener('click', handleClick)
        }
      })
    }
  }, [mapRef, onPopupClick])
}
