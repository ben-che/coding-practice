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
            // on form submit, pass event and value to handler and clear text
            <form onSubmit={(event)=>{this.props.taskSubmit(event, this.state.val); 
                                      this.setState({val:''});
                                      }}>
                <div className="">
                <input className="form-control header--inputform--box text-center" placeholder="enter new rule" value={this.state.val} onChange={this.textChangeHandler} required maxlength="30"/>
                    <span className="input-group-btn text-center">
                        <button className="header--inputform--submit" type="submit" value="Add">add rule</button>
                        
                    </span>
                    
                </div>
            </form>
        )
    }
}

export default TaskInput