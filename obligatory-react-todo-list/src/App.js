import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ToDoList from './components/ToDoList';
import TaskInput from './components/TaskInput'
import ListActions from './components/ListActions'


class App extends Component {

  constructor() {

    super();
    // define each task's description, completeness, and unique key 
    //  task will be an array of objects so that the entirety of the to do list's tasks can be captured 
    //  in the array
    // keyGen will give a unique identifier to a new task upon creation
    this.state = {
      // init tasks with items as test data
      tasks : 
        [{
        description: "get milk",
        complete: false,
        key: 0
      },
      {
        description: "get eggs",
        complete: false,
        key: 1
      },
      {
        description: "fix laptop",
        complete: false,
        key: 2
      },
      {
        description: "pick up mail",
        complete: true,
        key: 3
      }
    ],
    keyGen: 4
  }}
  
  // updateChecked will allow users to visually change the completeness of a task
  //  it will be passed as a prop to the ToDoItem component, where it will be used when the
  //  task's checkbox gets clicked
  updateChecked = (key) => {
    // to do this, a copy of the list needs to be made
    // in this copy, the function must find which todo object's state is being changed
    // this is accomplished by matching the key parameter with the index number of the todo object
    let updatedList = Array.from(this.state.tasks).map((element) => {
      let todoItem = element;
      
      if (todoItem.key === key) {
        todoItem.complete = !todoItem.complete;
      }
      return todoItem;
    });
      // set the old parameters of tasks to the new parameters included in the updatedList
      this.setState({
        tasks: updatedList
      });

  }

  // taskSubmit is a handler that takes a description of the task the user wants to add
  //  and adds it as an object to the list of tasks currently displayed on the page
  //  as an added side effect, it stops the page from refreshing
  taskSubmit = (event, desc) => {
    // stop page refresh
    event.preventDefault();
    // use a variable to hold the new task's parameters as an object
    let newTask = { description: desc,
                      complete: false,
                      key: this.state.keyGen
                  }
    // create a copy of tasks and push new item to end of array
    let taskCopy = Array.from(this.state.tasks)
    taskCopy.push(newTask);
    
    // update the tasks in the state object, add 1 to keyGen so that values are unique
    this.setState({
      tasks:taskCopy,
      keyGen: this.state.keyGen + 1
    })
  }

  // clearComplete is an event handler that clears the completed tasks from the page
  clearComplete = () => {
    // init an empty array where incomplete items will be pushed
    let incompleteTasks = []
    // push incomplete items into the aforementioned array
    this.state.tasks.map((element) => {
      let oneTask = element;
      if (!oneTask.complete) {
        incompleteTasks.push(oneTask);
      }
    })
    // update states by giving it a new array of only unfinished tasks
    this.setState({
      tasks: incompleteTasks
    })
  }

  render() {
    return (
      <div className='container'>

        <h1 className="text-center">To Dos</h1>

          <TaskInput taskSubmit={this.taskSubmit}/>
        
          <ToDoList tasks={this.state.tasks} updateChecked={this.updateChecked} />

          <ListActions clearComplete={this.clearComplete} />

      </div>
      
    );
  }
}

export default App;