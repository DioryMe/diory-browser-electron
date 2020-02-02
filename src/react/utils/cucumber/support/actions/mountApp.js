import React from 'react'
import { mount } from 'enzyme'
import App from '../../../../App'

export function mountApp() {
  const div = global.document.createElement('div')
  global.document.body.appendChild(div)

  this.app = mount(<App />, { attachTo: div })
}
