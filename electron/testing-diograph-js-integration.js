// Testing diograph-js integration
// eslint-disable-next-line import/newline-after-import
const { DiographJson } = require('../diograph-js')
const dio = new DiographJson({ baseUrl: './public/diory-demo-content' })
dio.loadDiograph().then(() => {
  console.log(dio.getDiory('generic-content'))
})
