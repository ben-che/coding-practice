import React, { Component } from 'react';
// import logo from './logo.svg';
import ToDoList from './components/ToDoList';
import TaskInput from './components/TaskInput'
import ListActions from './components/ListActions'
import Counter from './components/Counter'


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
        description: "one: dont pick up the phone (hes only calling cuz hes drunk and alone)",
        complete: false,
        key: 0,
        hide:false
      },
      {
        description: "two: don't let him in (you'll have to kick him out again)",
        complete: false,
        key: 1,
        hide:false
      },
      {
        description: "three: don't be his friend (you know you'll wake up in his bed in the morning)",
        complete: false,
        key: 2,
        hide:false
      },
      {
        description: "and if you get under him, you aint gettin over him",
        complete: true,
        key: 3,
        hide:false
      }
    ],
    keyGen: 4,
    filter: 'all',
    counter: {
      all: 4,
      active: 3,
      complete: 1
    }
  }}
  
  // updateChecked will allow users to visually change the completeness of a task
  //  it will be passed as a prop to the ToDoItem component, where it will be used when the
  //  task's checkbox gets clicked
  updateChecked = (key) => {
    // to do this, a copy of the list needs to be made
    // in this copy, the function must find which todo object's state is being changed
    // this is accomplished by matching the key parameter with the index number of the todo object

    // also, create variables so that the counter state can be appropriately updated
    let updatedActive = this.state.counter.active;
    let updatedComplete = this.state.counter.complete;

    let updatedList = Array.from(this.state.tasks).map((element) => {
      let todoItem = element;
      
      if (todoItem.key === key) {
        // updating new counter variables
        if (todoItem.complete) {
          updatedActive = updatedActive + 1;
          updatedComplete = updatedComplete -1;
        }
        else if (!todoItem.complete) {
          updatedActive = updatedActive - 1;
          updatedComplete = updatedComplete + 1;
        }
        todoItem.complete = !todoItem.complete;
      }
      return todoItem;
    });
      // set the old parameters of tasks to the new parameters included in the updatedList
      this.setState({
        tasks: updatedList,
        counter: {
          all: this.state.counter.all,
          active: updatedActive,
          complete: updatedComplete
        }
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
                      key: this.state.keyGen,
                      hide:false
                  }
    // create a copy of tasks and push new item to end of array
    let taskCopy = Array.from(this.state.tasks)
    taskCopy.push(newTask);
    
    // update the tasks in the state object, add 1 to keyGen so that values are unique
    this.setState({
      tasks:taskCopy,
      keyGen: this.state.keyGen + 1,
      counter: {
        all: this.state.counter.all + 1,
        active: this.state.counter.active + 1,
        complete: this.state.counter.complete
      }
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
      tasks: incompleteTasks,
      counter: {
        all: this.state.counter.all - this.state.counter.complete,
        active: this.state.counter.active,
        complete: 0
      }
    })
  }

  // filterTasks is an event handler that filters the list of tasks by completion
  filterTasks = (event) => {

    this.setState({filter: event.target.value});

    let filter = event.target.value
    console.log(filter)

    if (filter === 'all') {
      let updatedList = Array.from(this.state.tasks).map((element) => {
      let todoItem = element;

      todoItem.hide = false;
      return todoItem;
    });

    this.setState({
      tasks: updatedList
    });
    }
    else if (filter === 'active') {
      let updatedList = Array.from(this.state.tasks).map((element) => {
      let todoItem = element;
      
      if (!todoItem.complete) {
        todoItem.hide = false;
      }
      else {
        todoItem.hide=true;
      }
      
      return todoItem;
    });

    this.setState({
      tasks: updatedList
    });
  }
  else if (filter === 'complete') {
    let updatedList = Array.from(this.state.tasks).map((element) => {
    let todoItem = element;
    
    if (todoItem.complete) {
      todoItem.hide = false;
    }
    else {
      todoItem.hide=true;
    }
    
    return todoItem;
  });

  this.setState({
    tasks: updatedList
  });
}}

  render() {

    return (
      <div className="height-100">
        {/* Fixed Header - contains title and form input and list actions */}
        <div className='header--fixed'>
          <h3 className="text-center">to don't list</h3>
          <div className='container'>
            <div className='row'>
                <TaskInput taskSubmit={this.taskSubmit}/>
                <ListActions filter={this.state.filter} clearComplete={this.clearComplete} filterTasks={this.filterTasks} completenessCounter={this.state.counter}/>
            </div>
          </div>
        </div>

        {/* Sticky Notes and Counter Component */}
          <ToDoList tasks={this.state.tasks} updateChecked={this.updateChecked} />
          <Counter counter={this.state.counter} />
        </div>
      
    );
  }
}

export default App;