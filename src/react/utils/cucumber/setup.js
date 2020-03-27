import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import expect from 'expect'

configure({ adapter: new Adapter() })

global.expect = expect

const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {})
const { window } = jsdom
window.ipcRenderer = {
  send: (channel, data) => {},
  on: (channel, callback) => {
    const data = require(`./src/react/features/connector/mockResponses`)
    callback('event', data, null)
  },
  removeAllListeners: channel => {},
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
  platform: '',
}
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function(id) {
  clearTimeout(id)
}

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}
copyProps(window, global)
