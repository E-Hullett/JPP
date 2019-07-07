import React from 'react';
import ReactDOM from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './Routes';
//import Routes from './routes'


ReactDOM.render(( <App />
), document.getElementById('root'))

serviceWorker.unregister();



/*
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from "./components/js/Home";
import Login from "./components/js/Login";
import About from "./components/js/About";
<Router>
    <Route path="/" component={App}>
        <Route exact path= {"/home"} component={Home} />
        <Route exact path={"/login"} component={Login} />
        <Route exact path={"/about"} component={About} />
    </Route>
</Router>
*/