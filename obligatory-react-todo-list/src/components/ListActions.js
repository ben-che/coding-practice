import React, { Component } from 'react';

class ListActions extends Component {
    render() {
       let completenessCounter = this.props.completenessCounter;

       // disable clear complete if there is nothing to clear
       let disableButton;
       if (completenessCounter.complete === 0) {
            disableButton = 'disabled'
       }
       else {
           disableButton = ''
       }

        return (
            <div>
                <select onChange={(event)=>{this.props.filterTasks(event)}}>
                    <option value='all'>all</option>
                    <option value='active'>active</option>
                    <option value='complete'>complete</option>
                </select>

                <button onClick={this.props.clearComplete} disabled={disableButton}> clear complete </button>
            </div>
        )
    }
    
}

export default ListActions;