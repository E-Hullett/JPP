import React, { Component } from 'react';
import Footer from '../widgets/Footer.jsx';
import NavBar from '../widgets/NavBar.jsx';
//import Jumbotron from '../widgets/Jumbotron.jsx';
import '../../css/Login.css'

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            email: "",
            password: "",
            currentLogin: [],
            loginStatus: false,
            errorFeedback: ""
        };
    }

    validateForm(){
        if (this.state.username < 0 || this.state.password < 0) {
            this.setState({errorFeedback: "Entries blank"})
            return false
        }
        return true
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        //console.log(this.state.email)
        event.preventDefault();
            //Send request property (for the server to interpret), email and passwords sent for server-side sign in
            fetch('/api/users/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({request: "login", email: this.state.email, password: this.state.password})
            }).then(res => res.json())
                .then(res => {
                    console.log("Client response")
                    console.log(res[0])
                    if (res[0].authResult === true){
                        //For the rest of the program to check if the user is logged in
                        this.setState({loginStatus: true});
                        //Values of login are saved to state so they can be used later
                        this.setState({currentLogin: res[0]});
                        //console.log(res[0])
                        //Call the Dashboard component and pass login details via props, these can be accessed in the component via this.props.location.state
                        //console.log("Email and password match: successful login");
                        this.setState({errorFeedback: `Logged in as: ${res[0].username}`});

                        this.props.history.push({
                            pathname: '/dashboard',
                            state: { currentLogin: this.state.currentLogin, loginStatus: this.state.loginStatus, }
                        })

                        } else if (res[0].authResult === false){
                            //console.log("Correct email but incorrect password");
                            this.setState({errorFeedback: `Incorrect password for email: ${res[0].email}`})
                        } else{
                        this.setState({errorFeedback: `Unexpected response from server`})
                        }


                })
                .catch((err) => {
                        //console.log("Email address not identified");
                        this.setState({errorFeedback: "Something when wrong"})
                    })
                //FIXME Add catch for TypeError caused when email is not found
                //this.setState({errorFeedback: `Email: ${res[0].email}, not identified`})

                };



    render(){
        return (
            <div className="Login" id="Bella">
                <NavBar />
                    <div className="container">
                    <div className ="FormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="email" bsSize="large">
                                <ControlLabel>Email</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <ControlLabel>Password</ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                            <Button
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                            >
                                Login
                            </Button>
                            <p id="feedbackParagraph">{this.state.errorFeedback}</p>

                        </form>

                    </div>
                    </div>
                <Footer />
            </div>
        );
    }
}


