import React, { Component } from 'react';
import './App.css';
// Importing required components from react-router-dom
import { Switch, Route, Link } from 'react-router-dom';
import Home from './subcomponents/Home';
import Shop from './subcomponents/Shop';
 
class App extends Component {

  constructor() {
    super();
    this.state = {
      // user credentials state
      user: {
        name:''
    }}
  }
  // storeUser takes a string as an input, and updates the user property in the component's state
    // it is created to store user information
    storeUser = (event, name) => {
      event.preventDefault();
      this.setState({
          user: {
              name:name
          }
      })
      localStorage.setItem('user', name);
  }

  // get user's name from local storage if they've filled it out
  // update state with user's name from localstorage if it's there
  componentDidMount = () => {
    let name = localStorage.getItem('user');
    this.setState({
      user: {
        name: name
      }
    })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/shop'>Shop</Link>
        </nav>
        <Switch>
          <Route path='/' exact render={(props) => ( <Home storeUser={this.storeUser} {...props} /> )} />
          <Route path='/shop' render= { (props) => ( <Shop username={this.state.user.name} {...props} /> )} />
        </Switch>
      </div>
    );
  }
}

export default App;
