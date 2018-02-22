import React, { Component } from 'react';

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

        return (
            <div>
                <h1>Home</h1>
                <h2>Welcome {this.props.username}</h2>
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