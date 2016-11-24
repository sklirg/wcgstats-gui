import React, { Component } from 'react';
import abakusLogo from '../public/abakus.png';
import onlineLogo from '../public/online.svg';
import './App.css';

import GraphContainer from './containers/GraphContainer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      teams: []
    }
  }

  getTeams() {
    fetch(this.props.apiRoot + "teams/")
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.setState({"teams": response.teams})
      })
      .catch(err => {
        console.error("error", err);
      })
  }

  componentDidMount() {
    this.getTeams()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={abakusLogo} className="App-logo" alt="abakus" />
          <img src={onlineLogo} className="App-logo" alt="online" />
          <h1>Saving the world</h1>
        </div>
        <GraphContainer teams={this.state.teams} apiRoot={this.props.apiRoot} />
      </div>
    );
  }
}

export default App;
