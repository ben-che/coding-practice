import React, {Component} from 'react';

class SubmitButton extends Component{
    render() {
        return (
            <span className='input-group-btn'>
                <button className='btn btn-primary' type='submit'> {this.props.btnDesc}</button>
            </span>
        )
    }
}

export default SubmitButton;