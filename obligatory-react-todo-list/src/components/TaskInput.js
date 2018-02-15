import React, {Component} from 'react';

class TaskInput extends Component {

    constructor() {
        super();
        // create a state to capture the value of the user's input WHILE they 
        //  are typing - this will be handled wuith the textChangeHandler method
        this.state = {
            val:''
        }
    }

    // textChangeHandler is a onChange handler that allows the state of the 'val' parameter
    //  within the task input component to change
    textChangeHandler = (event) => {
        let newVal = event.target.value;
        this.setState({
            val: newVal
        })
    }

    render() {
        return (
            <form onSubmit={(event)=>{this.props.taskSubmit(event, this.state.val)}}>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </span>
                    <input className="form-control" placeholder="Add a task" value={this.state.val} onChange={this.textChangeHandler} />
                </div>
            </form>
        )
    }
}



export default TaskInput