// Base64 colors are 1x1 png images generated with https://png-pixel.com/

const getRandom = (array) => array[Math.floor(Math.random() * array.length)]

const prefix = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42'
const suffix = 'AAAAABJRU5ErkJggg=='

const colors = [
  'mOMPvD6PwAGiwMHcHyXE', // #5bc0eb
  'mP8c43hPwAHewLTbrmJl', // #fcd600
  'mOcfdT2PwAGPgKeWQwJu', // #9bc53d
  'mN8GmnyHwAGEAJzBJT/2', // #e55934
  'mP8Van4HwAGngKVn65TsQ/2', // #fa7921
  'mMUMgn7DwACmQGdtDFX8', // #123456
]

export const getDefaultImage = () => `data:image/png;base64,${prefix}${getRandom(colors)}${suffix}`
