import L from 'leaflet'

const getPopupStyle = ({ image }) =>
  [
    'overflow: hidden',
    'min-width: 400px',
    'min-height: 200px',
    `background-color: #fa7921`,
    `background-image: url('${image}')`,
    'background-size: cover',
    'background-position: center',
    'background-repeat: no-repeat',
  ].join(';')

export const createDioryPopup = ({ diory = {} }) => {
  const elements = [
    diory.text &&
      `<div style="margin: 16px; font-size: 16px; font-weight: bold; color: white">${diory.text}</div>`,
  ]
    .filter(Boolean)
    .join('')

  const content = `<div style="${getPopupStyle(diory)}">${elements}</div>`
  const popup = L.popup({
    closeButton: false,
  }).setContent(content)

  popup.diory = diory
  return popup
}
