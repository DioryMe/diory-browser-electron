import React from 'react'
import { mount } from 'enzyme'
import App from '../../../App'

export default function() {
  this.app = mount(<App />)
}
