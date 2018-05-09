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
let mockState = "";
let mockAction = {
    type:'ADD_LETTER',
    letter:'r'
}

let wordReducer = (mockState, mockAction) => {
    switch(mockAction.type) {
        case 'ADD_LETTER':
        return mockState + mockAction.letter;
        case 'RESET':
        return '';
        default:
        return mockState;
    }
}

// reducers specify how state will change in response to redux actions that
//  are sent to store
//  actions describe what happened, but don't describe state changes
let reducer = () => {
    return 'State';
}

const store = createStore(reducer);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
