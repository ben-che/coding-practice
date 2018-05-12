import { UPDATE_USER } from '../actions/user-action.js';

export default function userReducer(state = '', {type, payload}) {
    console.log('userReducer is firing');
    // add a switch statement that will update the user state
    switch (type) {
        case UPDATE_USER:
            return payload.user;
        default:
            return state;
    }
    return state;
}