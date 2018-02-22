import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';


ReactDOM.render(
    // Using BrowserRouter to wrap around any other react-router-dom components 
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root'));
    registerServiceWorker();
