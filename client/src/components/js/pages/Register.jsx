import React, { Component } from 'react';
import Footer from '../widgets/Footer.jsx';
import NavBar from '../widgets/NavBar.jsx';
//import Jumbotron from '../widgets/Jumbotron.jsx';

import '../../css/Form.css'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
const uuidv4 = require('uuid/v4');

//TODO Figure out a fancy way of showing erros
export default class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            email: "",
            username:"",
            password: "",
            currentLogin: [],
            loginStatus: false,
            errorFeedback: "",
            errorList: []
        };
    }
    //Validation that is constantly being checked, the form is locked if false is returned
    validateForm() {
        //If errorList has an error the statemetn generates true, then ! swaps it to false to disable the form
        return (!this.state.errorList.length > 0)
    }

    //Validation that only checks when the user enters a value (to save processing power and allow for more checks)
    validateCheck = () => {
        let errorList = []
        // eslint-disable-next-line
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.state.email) === false)errorList.push("Invalid email")
        if (this.state.username.length<6){
            errorList.push("Username needs to be more than 5 characters ")
        } else if(this.state.username.length>20){errorList.push("Username needs to be within 20 characters")}

        if (this.state.password.length<10){
            errorList.push("Password needs to be more than 9 characters")
        } else if(this.state.password.length>20){errorList.push("Password needs to be within 20 characters")}
        //Update state with current errors for validateForm and ErrorLabel
        this.setState({errorList: errorList})
        //Show errors to the user
        this.setState({errorFeedback: errorList.join("\n")})
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        //Check if update has made form invalid
        this.validateCheck()
    }

    handleSubmit = event => {
        //console.log(this.state.email)
        event.preventDefault();
        fetch('/api/users/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({request: "register", email: this.state.email})
        }).then(res => res.json())
            .then(res => {
                //If the email exists then the account is taken, if email is undefined then the database found nothing (hence its free)
                    if(res.emailExists){
                        this.setState({errorFeedback: `Account for: ${this.state.email} already exists`});
                    }else if(res.emailExists === false){
                        //Generate ID nad get rid of the hyphens and add to state
                        let userID = uuidv4().replace(/-/g,"")
                        this.setState({user_id: userID})
                        fetch('/api/users/register', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({request: "register", user_id: this.state.user_id, email: this.state.email, username: this.state.username, password: this.state.password})
                        }).then(res => res.json()).then(res => {
                            console.log("Client logs")
                            console.log(res)
                            //console.log(res)
                            this.setState({loginStatus: true})
                            this.setState({currentLogin: {id: null, user_id: this.state.user_id,  email: this.state.email, username: this.state.username, password: this.state.password, status: "User"}})
                            this.setState({errorFeedback: `New user: ${this.state.email}, successfully created`});
                            this.props.history.push({
                                pathname: 'dashboard',
                                state: { currentLogin: this.state.currentLogin, loginStatus: this.state.loginStatus, }
                            })
                    })
                }

            })
            .catch((err) => {
                console.log(err)
                //console.log("Something when wrong");
                this.setState({errorFeedback: "Error occurred"})
            })
    };
    render(){
        return (
            <div className="Login" id="AuthContainer">
                <NavBar />
                <div className ="Container">
                    <form onSubmit={this.handleSubmit} className="FormBox">
                        <h1 className="FormHeader"> LOGIN </h1>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                                autoFocus
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="username" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                value={this.state.username}
                                onChange={this.handleChange}
                                type="username"
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
                            Register
                        </Button>
                        <p id={"feedbackParagraph"}>{this.state.errorFeedback}</p>

                    </form>


                </div>
                <Footer />
            </div>
        );
    }
}


