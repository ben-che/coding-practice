import React, { Component } from 'react';

class ListActions extends Component {

    render() {
        return (
            <button onClick={this.props.clearComplete}> clear complete </button>
        )
    }
    
}

export default ListActions;