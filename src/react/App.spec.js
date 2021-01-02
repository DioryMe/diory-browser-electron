import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// FIXME: Skipped because don't know how to mock ipcRenderer.invoke properly
it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
