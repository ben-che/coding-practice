import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    startTimer : 10
  }

  startTimer = () => {
    setInterval( () => {
      this.setState({
        startTimer : this.state.startTimer - 1
      })
    }, 1000)
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>


        <div>
          <p>{this.state.startTimer > 0? this.state.startTimer : "Time's Up"}</p>

          <button onClick = {this.startTimer}> Start timer </button>
        </div>

      </div>
    );
  }
}

export default App;
