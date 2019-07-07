import React, { Component } from 'react';
import NavBar from "../widgets/NavBar";
import {Button, ControlLabel, FormControl, FormGroup, Checkbox} from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


export default class DataForm extends Component {
    constructor(props) {
        super(props);
        //Set the passed state = to the local state (to get login details)
        this.state = this.props.location.state;
        this.state.validationErrors = [];
        this.state.errorList = []
        this.state.appointmentData = {
            title: "",
            date: "",
            start_time: "",
            end_time: "",
            breed_standard: "",
            coat_removal: "",
            handstrip: false,
            notes: ""
        };
        this.state.datePicker = {
            isEmpty: true,
            isDisabled: false,
        }
    }


    validateForm() {
        //If problems are picked up return false
        return (!this.state.errorList.length > 0)
    }

    validateCheck = () => {
        let AF = this.state.appointmentData
        let errorList = []

        this.setState({errorList: errorList})
    }


    //Entries
    handleChange = event => {
        //this.setState({[event.target.id]: event.target.value });
        this.setState({appointmentData: {...this.state.appointmentData, [event.target.id]: event.target.value}})
        this.validateCheck()
    }

    //Checkboxes
    handleToggle = event => {
        //...State is set so that only the required property is changed, hence not triggering controlled -> uncontrolled react error
        this.setState({dataForm: {...this.state.appointmentData, [event.target.id]: event.target.checked}})
        //console.log(event.target.checked)
    }

    //For imported date picker
    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        //state needs to be sent differently since the normal event object is not passed
        this.setState((state) => ({appointmentData: {...state.appointmentData, DOB: selectedDay}}))
        this.setState({datePicker: {...this.state.datePicker, [this.state.datePicker.isEmpty]: !input.value.trim()}})
        this.setState({
            datePicker: {
                ...this.state.datePicker,
                [this.state.datePicker.isDisabled]: modifiers.disabled === true
            }
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        //Format values in dataForm so it is in the correct format to be sent to the api
        //Set up a dataForm replica to be updated with the new values, it will then be replaced with the old dataForm
        let appointmentData = {...this.state.appointmentData}

        //dataForm object is passed manually since state batch is not updated quick enougth
        this.sendData(appointmentData)
    };

    sendData = (appointmentData) => {
        //console.log(dataForm)
        //Send data to postgres server
        fetch('/api/users/addAppointment', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                dataSubmit: {
                    currentLogin: this.state.currentLogin,
                    appointmentData: appointmentData,
                }
            })
        }).then(res => res.json()).then(res => {
            //console.log(res)
            //Go back to dashboard after data is submitted
            this.props.history.push({
                pathname: '/dashboard',
                state: {currentLogin: this.state.currentLogin, loginStatus: this.state.loginStatus,}
            })
        }).catch((err) => {
            console.log("An error occurred")
        })
    }

    render(){
        //console.log(this.state.currentLogin)
        return(
            <div className="dataForm">
                <NavBar loginStatus={this.state.loginStatus} currentLogin={this.state.currentLogin} />
                <div className="container">
                    <h2> Add appointment</h2>
                    <p id="feedbackParagraph">

                    </p>
                    <div className ="FormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <div> Give us the infomation to contact you</div>
                            <FormGroup controlId="title" bsSize="large">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.appointmentData.title}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup controlId="date" bsSize="large">
                                <ControlLabel>Appointment date</ControlLabel>
                                <p>
                                    {this.state.datePicker.isEmpty && 'Please type or pick a day'}
                                    {!this.state.datePicker.isEmpty && !this.state.appointmentData.date && 'This day is invalid'}
                                    {this.state.appointmentData.date && this.state.datePicker.isDisabled && 'This day is disabled'}
                                    {this.state.appointmentData.date && !this.state.datePicker.isDisabled}
                                    {/*&& `You chose ${this.state.dataForm.DOB.toLocaleDateString()}`} */   }
                                </p>
                                <DayPickerInput
                                    id="DOB"
                                    value={this.state.appointmentData.date}
                                    onDayChange={this.handleDayChange}
                                    dayPickerProps={{
                                        id: "DOB",
                                        selectedDays: this.state.appointmentData.date,
                                        disabledDays: {
                                            daysOfWeek: [0, 0],
                                        },
                                    }}
                                />
                            </FormGroup>

                            <FormGroup controlId="breed_standard" bsSize="large">
                                <ControlLabel>Enter breed standard infomation</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.appointmentData.breed_standard}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="coat_removal" bsSize="large">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.appointmentData.coat_removal}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="handstrip" bsSize="large">
                                <ControlLabel>Does your dog need a handstrip</ControlLabel>
                                <Checkbox id="handstrip" checked={this.state.appointmentData.handstrip} onChange={this.handleToggle} > Yes </Checkbox>
                            </FormGroup>


                        </form>
                    </div>
                </div>
            </div>
        )
    }
}