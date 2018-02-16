import React, { Component } from 'react';

class ListActions extends Component {
    render() {
       
        return (
            <div>
                <select onChange={(event)=>{this.props.filterTasks(event)}}>
                    <option value='all'>all</option>
                    <option value='active'>active</option>
                    <option value='complete'>complete</option>
                </select>

                <button onClick={this.props.clearComplete}> clear complete </button>
            </div>
        )
    }
    
}

export default ListActions;