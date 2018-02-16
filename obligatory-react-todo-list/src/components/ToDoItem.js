import React, { Component } from 'react';

class ToDoItem extends Component {

    render() {
        // task completion logic:
        let done, checked, hidden;

        let finished = this.props.complete;
        if (finished) {
            done = 'done';
            checked="checked"
        }
        else if (!finished) {
            done = "";
            checked=""
        }

        // filter logic:
        // set display to none if filter conditions are true
        let hideMe = this.props.hide;
        if (hideMe) {
            hidden =' hidden';
        }
        else if (!hideMe) {
            hidden = '';
        }

        return (
            <li className={'list-group-item' + hidden}>
                {/* if the checkbox value gets changed, this specific item's id will be passed to updateChecked
                    for comparison and eventual state update */}
                <input type='checkbox' value='on' checked={checked} onChange={() => {this.props.updateChecked(this.props.id)}} />
                <label className={done}>{this.props.description}</label>
            </li>
        )
    }
}

export default ToDoItem;
