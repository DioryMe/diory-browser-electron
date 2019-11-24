import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { channels } from '../shared/constants';
import NavBar from './NavBar'

const { ipcRenderer } = window;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: '',
      appVersion: '',
    }
    ipcRenderer.send(channels.APP_INFO);
    ipcRenderer.on(channels.APP_INFO, (event, arg) => {
      ipcRenderer.removeAllListeners(channels.APP_INFO);
      const { appName, appVersion } = arg;
      this.setState({ appName, appVersion });
    });
  }

  render() {
    const { appName, appVersion } = this.state;

    const navbar = {
      lenses: [
        {name:'Map', icon: 'map'},
        {name:'Timeline', icon: 'time'},
        {name:'Graph', icon: 'graph'},
      ],
      search: {
        placeholder: 'Search diories...',
      }
    }

    return (
      <div className="App">
        <NavBar {...navbar}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{appName} version {appVersion}</p>
        </header>
      </div>
    );
  }
}

export default App;
