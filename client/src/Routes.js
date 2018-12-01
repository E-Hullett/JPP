import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/js/pages/Home.jsx'
import Login from './components/js/pages/Login.jsx'
import About from './components/js/pages/About.jsx'
import Register from './components/js/pages/Register'

import Home2 from './components/js/pages/Home2'

class routes extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path= {"/"} component={Home} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/about"} component={About} />
                    <Route path={"/register"} component={Register} />
                    <Route path={"/home2"} component={Home2} />
                </div>
            </Router>
        )
    }
}

export default routes;
