import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './components/js/pages/Home.jsx'
import Login from './components/js/pages/Login.jsx'
import About from './components/js/pages/About.jsx'
import Register from './components/js/pages/Register.jsx'

import Dashboard from './components/js/pages2/dashboard'
import DataForm from './components/js/pages2/DataForm'
import EditAppointments from './components/js/pages2/EditAppointments'

//import NavBar from "./components/js/widgets/NavBar";

class routes extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Route exact path= {"/"} component={Home} />
                    <Route path={"/login"} component={Login} />
                    <Route path={"/about"} component={About} />
                    <Route path={"/register"} component={Register} />
                    <Route path={"/dashboard"}  component={Dashboard} />
                    <Route path={"/data_form"}  component={DataForm} />
                    <Route path={"/edit_appointments"}  component={EditAppointments} />
                </div>
            </Router>
        )
    }
}

export default routes;

//<Route path="/home2" render={(props) => <Dashboard loginStatus={this.props.loginStatus} currentLogin={this.props.currentLogin} {...props} /> } />
