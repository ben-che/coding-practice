import React, { Component } from 'react';

class ToDoItem extends Component {

    render() {
        // task completion logic:
        let done, checked;  

        let finished = this.props.complete;
        if (finished) {
            done = 'done';
            checked="checked"
        }
        else if (!finished) {
            done = "";
            checked=""
        }

        return (
            <li className='list-group-item'>
                {/* if the checkbox value gets changed, this specific item's id will be passed to updateChecked
                    for comparison and eventual state update */}
                <input type='checkbox' value='on' checked={checked} onChange={() => {this.props.updateChecked(this.props.id)}} />
                <label className={done}>{this.props.description}</label>
            </li>
        )
    }
}

export default ToDoItem;
