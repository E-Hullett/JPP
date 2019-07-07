import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import App from './components/js/App'
import Login from './components/js/Login'

class routes extends Component {
    render() {
        return(
            <Router>
                <div>
                    <ul>
                        <li><Link to={'/'}> Home </Link> </li>
                        <li><Link to={'/login'}> Login </Link></li>
                    </ul>
                    <Route exact path= {"/"} component={App} />
                    <Route exact path={"/login"} component={Login} />
                </div>
            </Router>
        )
    }
}

export default routes;
