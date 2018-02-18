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
            // Made the entirety of the list item clickable as opposed to just the checkbox or label for usability reasons
            <div className={"sticky-note--container col-md-4" + hidden} onClick={() => {this.props.updateChecked(this.props.id)}}>
                <div className='tape'></div>
                <li className='sticky-note--liststyle text-center' >
                        {/* if the checkbox value gets changed, this specific item's id will be passed to updateChecked
                            for comparison and eventual state update */}
                            
                        <input id={this.props.id} className='todoitem--hideCheckbox' type='checkbox' value='on' checked={checked}  />
                    
                    <label className={done}>{this.props.description}</label>
                </li>
            </div>
        )
    }
}

export default ToDoItem;
