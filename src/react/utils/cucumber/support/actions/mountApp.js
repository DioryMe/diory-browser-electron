import React from 'react'
import { mount } from 'enzyme'
import App from '../../../../App'

export function mountApp() {
  this.app = mount(<App />)
}
