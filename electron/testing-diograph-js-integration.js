const { DiographJson } = require('../diograph-js')

const dio = new DiographJson({ baseUrl: __dirname })
dio.loadDiograph().then(
  () => {
    console.log('Generic content diory from test content:', dio.getDiory('generic-content'))
  },
  (e) => {
    console.log(e)
  }
)
