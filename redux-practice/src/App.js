import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// allows us to connect this component to the store
import { connect } from 'react-redux';
import { updateUser } from './actions/user-action.js';

class App extends Component {
  onUpdateUser = () => {
    console.log('onUpdateUser function fires - we mapped onUpdateUser to the updateUser in user-action, so that function will run');
    this.props.onUpdateUser('Ben');
  }

  render() {
    // by console logging props - we can see that App has access to the states
    //    defined in index without us explicitly passing anything to app
    console.log(`props being passed to app`);
    console.log(this.props);

    // sample onClick to show how redux passes action to reducer and updates state:

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div onClick={this.onUpdateUser}>
          Update User
          {this.props.user}
        </div>
      </div>
    );
  }
}

// this allows us to map state to props
const mapStateToProps = state => ({
  products: state.products,
  user: state.user
})

const mapActionToProps = {
  onUpdateUser: updateUser
}

export default connect(mapStateToProps, mapActionToProps)(App);
