import React, { Component } from 'react';

class Counter extends Component {

    // completenessCounter = () => {
    //     let newActive=0, 
    //         newComplete=0;
    //     this.state.tasks.filter(()=> {
    //         if (!this.state.tasks.complete) {
    //             return newActive = newActive + 1;
    //         }
    //         else if (this.state.tasks.complete) {
    //             return newComplete = newComplete + 1;
    //         }
    //     })
    //     this.setState({
    //         counter: {
    //             all: (newActive + newComplete),
    //             active: newActive,
    //             complete: newComplete
    //         }  
    //     })
    //     }

    render() {
        
        return (
            <ul className="counter--container">
                <li>All: {this.props.counter.all}</li>
                <li>Active: {this.props.counter.active}</li>
                <li>Complete: {this.props.counter.complete}</li>
            </ul>
        )
    }
}

export default Counter;