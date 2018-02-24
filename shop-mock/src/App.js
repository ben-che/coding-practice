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
    let navStyle = {
      "width": "100vw",
      "height": "5vh",
      "backgroundColor": "#333",
      "textAlign":"right",
      "paddingTop":'1.5vh',
      'paddingRight':'3vw',
      'boxShadow':'0 2px 2px 2px #ccc',
      'zIndex' : "2",
      "position": 'fixed'
    }
    let navLink = {
      'color':'white',
      'marginRight':'2vw',
      'display':'inline-block'
    }
    return (
      <div className="App">
        <nav style={navStyle}>
        
          <Link style={navLink} to='/'>Home</Link>
          <Link style={navLink} to='/shop'>Shop</Link>
          
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
