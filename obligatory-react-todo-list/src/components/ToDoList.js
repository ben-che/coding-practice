import React, {Component} from 'react';
import ToDoItem from '../components/ToDoItem';

class ItemList extends Component {

    render() {
        // recieve props from app.js
        // task list:
        let taskList = this.props.tasks;
        
        // pass all the props in task list to each individual task
        let taskListJSX = taskList.map((element) => {
            return <ToDoItem description={element.description}
                             complete = {element.complete}
                             id = {element.key}
                             key = {element.key} 
                            //  pass the updateChecked function as a prop
                             updateChecked = {this.props.updateChecked} />
        })

        return (
            <ul className="list-group">
                {taskListJSX}
            </ul>
        )
    }
}

export default ItemList;