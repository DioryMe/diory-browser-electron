import { useEffect } from 'react'

export const usePopupClick = (mapRef, onPopupClick) => {
  useEffect(() => {
    const handleClick = (diory) => () => onPopupClick({ diory })
    if (mapRef.current) {
      mapRef.current.on('popupopen', (event) => {
        if (event.popup) {
          event.popup._wrapper.addEventListener('click', handleClick(event.popup.diory));
        }
      });
      mapRef.current.on('popupclose', (event) => {
        if (event.popup) {
          event.popup._wrapper.removeEventListener('click', handleClick(event.popup.diory));
        }
      });
    }
  }, [mapRef, onPopupClick])
}
