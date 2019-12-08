import React, { Component } from 'react'
import { channels } from '../../shared/constants'
const { ipcRenderer } = window

class Channels extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appName: '',
      appVersion: '',
    }
    ipcRenderer.send(channels.APP_INFO)
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO)
      const { appName, appVersion } = arg
      this.setState({ appName, appVersion })
    })
  }

  render() {
    const { appName, appVersion } = this.state
    console.log(appName, appVersion)

    return <div>{this.props.children}</div>
  }
}

export default Channels
