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
                <span className='text-center header--inputform--centerbutton'>
                    <button className="header--inputform--clearfinished" onClick={this.props.clearComplete} disabled={disableButton}> clear complete </button>
                </span>
                <span className='text-center header--inputform--centerbutton'>
                    <select onChange={(event)=>{this.props.filterTasks(event)}}>
                        <option value='all'>all</option>
                        <option value='active'>active</option>
                        <option value='complete'>complete</option>
                    </select>
                </span>
            </div>
        )
    }
    
}

export default ListActions;