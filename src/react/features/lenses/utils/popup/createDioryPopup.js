import L from 'leaflet'
import { convertToFileUrl } from '../../../../utils'

const getPopupStyle = ({ image }, folderLocation) =>
  [
    'overflow: hidden',
    'min-width: 400px',
    'min-height: 200px',
    `background-color: #fa7921`,
    `background-image: url('${convertToFileUrl(image, folderLocation)}')`,
    'background-size: cover',
    'background-position: center',
    'background-repeat: no-repeat',
  ].join(';')

export const createDioryPopup = ({ diory = {} }, folderLocation) => {
  const elements = [
    diory.text &&
      `<div style="margin: 16px; font-size: 16px; font-weight: bold; color: white">${diory.text}</div>`,
  ]
    .filter(Boolean)
    .join('')

  const content = `<div style="${getPopupStyle(diory, folderLocation)}">${elements}</div>`
  const popup = L.popup({
    closeButton: false,
  }).setContent(content)

  popup.diory = diory
  return popup
}
