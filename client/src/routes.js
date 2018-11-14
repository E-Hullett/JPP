import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import App from './components/js/App'
import Login from './components/js/Login'

export default (
    <BrowserRouter>
        <div>
            <ul>
                <li><Link to={'/'}> Home </Link> </li>
                <li><Link to={'/login'}> Login </Link></li>
            </ul>
            <Route exact path={"/"} component={App} />
            <Route exact path={"/login"} component={Login} />
        </div>
    </BrowserRouter>
);
