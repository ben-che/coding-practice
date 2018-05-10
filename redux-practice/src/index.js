import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// importing store from react-redux
import {createStore } from 'redux';

// new terminology for redux:
// Actions: Signal to UI that something happened, but don't actually handle state changes -
    // they are stateless, should be predictable, and describe the type of state change
    //  that happens, but the actual state change logic is handled by Reducers
// Reducer: The state change logic is handled here - Reducers are similar in logic to 
    // Array.reduce() in plain JS:
    // the idea looks like this:
    // (state, action) => newState
    // using this example below:

// mock state input:
// starting with an empty state:

// let mockState = "";
// let mockAction = {
//     type:'ADD_LETTER',
//     letter:'r'
// }

// let wordReducer = (mockState, mockAction) => {
//     switch(mockAction.type) {
//         case 'ADD_LETTER':
//         return mockState + mockAction.letter;
//         case 'RESET':
//         return '';
//         default:
//         return mockState;
//     }
// }

// however, this state isn't saved anywhere, and we need to make a Redux Store
// the Store has 4 main methods:
// store.getState() => returns current state of application
// store.disptach(action) => the proper way to trigger state changes; it changes
//  state based on action and rerenders any components affected by state
// store.subscribe(listener) => adds a change listener, its called when an action
//  is dispatched; often, though, when used in conjunction with React, we don't
//  have to specify this, as React does it for us

// Reducers specify how state will change in response to redux actions that
//  are sent to store
//  actions describe what happened, but don't describe state changes
let reducer = (state, action) => {
    // here, we have to make switch statements for all of the actions
    //  we will provide it, and give it behaviour
    if (action.type === 'changeState') {
        return action.payload.newState; // this will change our "State" to "New state"
    }
    return 'State';
}

// create a store for the Reducer
const store = createStore(reducer);
// we can use a .getState method to return what's in the store:
console.log(store.getState());
// at this moment, it will return 'State'

// we can define an action using this syntax:
const action = {
    type: 'changeState',
    payload: {
        newState: 'New state'
    }
}

// use action object to update state
store.dispatch(action)

// 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
