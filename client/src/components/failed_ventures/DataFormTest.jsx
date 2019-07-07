//npm i react-day-picker
import React, { Component } from 'react';
import NavBar from "../widgets/NavBar";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
//import Jumbotron from "../widgets/Jumbotron";
//import Footer from "../widgets/Footer";
//TODO, create figure out how to connect user_id as a foriegn key to users table, complete form, including all inuts so that it looks like the customer-data table
//FIXME Reduce size of the settingsGear logo so that it fits in the Navbar

export default class DataFormTest extends Component {
    constructor(props){
        super(props);
        //Set the passed state = to the local state (to get login details)
        this.state = this.props.location.state;
        this.state.dataForm = {
            address: "",
            DOB: undefined
        }
        this.state.datePicker = {
            isEmpty: true,
            isDisabled: false,
        }
    }

    validateForm() {

    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        console.log("handle submit")
    };

    //For imported date picker
    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        this.setState({dataForm: {DOB: selectedDay }})
        this.setState({datePicker:{isEmpty: !input.value.trim() }})
        this.setState({datePicker:{isDisabled: modifiers.disabled === true}})
    }

    render(){
        //console.log(this.state.currentLogin)
        return(
            <div className="container">
                <NavBar loginStatus={this.state.loginStatus} currentLogin={this.state.currentLogin} />
                    <h2> Submit customer data</h2>
                    <p>
                        You only need to do this once so that we have infomation required to look after your pet
                    </p>

                    <div className ="FormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <div> Give us the infomation to contact you</div>
                            <FormGroup controlId="address" bsSize="large">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="mobile" bsSize="large">
                                <ControlLabel>Mobile</ControlLabel>
                                <FormControl
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    type="username"
                                />
                            </FormGroup>
                            <div> Tell us about yur dog</div>
                            <FormGroup controlId="pets_name" bsSize="large">
                                <ControlLabel>Pets name</ControlLabel>
                                <FormControl
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    type="password"
                                />
                            </FormGroup>
                            <FormGroup controlId="DOB" bsSize="large">
                                <ControlLabel>Date of birth</ControlLabel>
                                    <p>
                                        {this.state.datePicker.isEmpty && 'Please type or pick a day'}
                                        {!this.state.datePicker.isEmpty && !this.state.dataForm.DOB && 'This day is invalid'}
                                        {this.state.dataForm.DOB && this.state.datePicker.isDisabled && 'This day is disabled'}
                                        {this.state.dataForm.DOB &&
                                        !this.state.datePicker.isDisabled &&
                                        `You chose ${this.state.dataForm.DOB.toLocaleDateString()}`}
                                    </p>
                                    <DayPickerInput
                                        value={this.state.dataForm.DOB}
                                        onDayChange={this.handleDayChange}
                                        dayPickerProps={{
                                            selectedDays: this.state.dataForm.DOB,
                                            disabledDays: {
                                                daysOfWeek: [0, 0],
                                            },
                                        }}
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
                        </form>

                    </div>


            </div>
        )
    }

}