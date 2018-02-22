import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {
    // controlled component setup
    constructor() {
        super();
        this.state = {
            val:''
        }
    }

    // form input change handler
    handleChange = (event) => {
        this.setState({
            val: event.target.value
        })
    }

    render() {
        // redirect users to the shop page if they are already 'logged in'
        //  checks localStorage to see if user.name is empty; if it isn't, redirect to Shop,
        //  else, render Home
        if (null !== localStorage.getItem('user')) {
            return ( <Redirect to='/shop' /> );
        }
        return (
            <div>
                <h1>Home</h1>
                {/* pass user's input back to app, reset the input field to an empty string */}
                <form onSubmit={(event) => {this.props.storeUser(event, this.state.val);
                                                                 this.setState({
                                                                     val:''
                                                                 })} } >
                    <input required type='text' placeholder='enter name' value={this.state.val} onChange={this.handleChange} />
                    <button type='submit'  >submit</button>
                </form>
            </div>
        )
    }
}

export default Home;