import L from 'leaflet'

const colors = ['#5bc0eb', '#fcd600', '#9bc53d', '#e55934', '#fa7921']
const getRandom = (array) => array[Math.floor(Math.random() * array.length)]

const getPopupStyle = ({ image }) =>
  [
    'overflow: hidden',
    'min-width: 400px',
    'min-height: 200px',
    `background-color: ${getRandom(colors)}`,
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
