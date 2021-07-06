import React from 'react';
import ReactDOM from 'react-dom'
import "./assets/css/bootstrap.min.css";
import "./assets/css/prism-okaidia.css";
import "./assets/js/jquery.min.js";
import "./assets/js/bootstrap.bundle.min.js";
import "./assets/js/jquery.min.js";
import "./assets/js/prism.js";

import App from './App'

window.$ipcoption = 'hostobject'; 

ReactDOM.render(
    <App />,
    document.getElementById('root')
    );