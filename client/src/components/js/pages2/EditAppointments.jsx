import React, { Component } from 'react';
import NavBar from "../widgets/NavBar";
import {Button, ControlLabel, FormControl, FormGroup, Checkbox} from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import '../../css/Form.css'

export default class DataForm extends Component {
    constructor(props) {
        super(props);
        //Set the passed state = to the local state (to get login details)
        this.state = this.props.location.state;
        this.state.errorFeedback = "";
        this.state.errorList = []
        this.state.appointmentData = {
            title: "",
            date: "",
            startTimeHours: "",
            startTimeMinutes: "",
            breedStandard: "",
            coatRemoval: "",
            handstrip: false,
            notes: ""
        };
        this.state.datePicker = {
            isEmpty: true,
            isDisabled: false,
        }
    }
    componentDidMount() {
        let errorList = ["No error check yet performed"]
        this.setState({errorList: errorList})
    }

    validateForm() {
        //If problems are picked up return false
        return (!this.state.errorList.length > 0)
    }

    validateCheck = () => {
        let AF = this.state.appointmentData
        let errorList = []
        let textEntryList = [AF.title, AF.breedStandard, AF.coatRemoval, AF.date, AF.notes, AF.startTimeHours, AF.startTimeMinutes]
        //Check non-optional enteries that are blank
        if(AF.title === "") errorList.push("No title entered");
        if(AF.date === "") errorList.push("No date entered")


        //Check entry list to control amount of characters
        for(let i=0;i<textEntryList.length;i++) {
            //Impose higher max character limit for options that may contain lots of text
            if (i < 3) {
                if (textEntryList[i].length > 25) {
                    errorList.push("Unnecessarily long entry");
                    break
                }
            } else if (i > 4) {
                if (textEntryList[i].length > 2) {
                    errorList.push("Data for appointment start time too long");
                    break
                }
            }
        }
            if (AF.startTimeHours === ""){errorList.push("No appointment start time hours entered")
            }else {
                if (!(/^\d*$/.test(AF.startTimeHours) && (parseInt(AF.startTimeHours) <= 24))) {
                    errorList.push("Input for appointment start time hours is invalid")
                }
            }
            if(AF.startTimeMinutes === "") {void(0)
            }else {
                if (!(/^\d*$/.test(AF.startTimeMinutes) && (parseInt(AF.startTimeMinutes) <= 59))) {
                    errorList.push("Input for appointment start time minutes is invalid")
                }
            }

        if (typeof AF.date == "undefined") errorList.push("Date of appointment is invalid")

        this.setState({errorList: errorList})
        //Format errorList to display to the user (the \n is picked up by css)
        this.setState({errorFeedback: errorList.join("\n")})
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
        this.setState({appointmentData: {...this.state.appointmentData, [event.target.id]: event.target.checked}})
        //console.log(event.target.checked)
    }

    //For imported date picker
    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        //state needs to be sent differently since the normal event object is not passed
        this.setState((state) => ({appointmentData: {...state.appointmentData, date: selectedDay}}))
        this.setState({datePicker: {...this.state.datePicker, [this.state.datePicker.isEmpty]: !input.value.trim()}})
        this.setState({datePicker: {...this.state.datePicker, [this.state.datePicker.isDisabled]: modifiers.disabled === true}})
    }

    handleSubmit = event => {
        event.preventDefault();
        //Format values in dataForm so it is in the correct format to be sent to the api
        //Set up a dataForm replica to be updated with the new values, it will then be replaced with the old dataForm
        let appointmentData = {...this.state.appointmentData}

        //Better to format later since Postgres will return original format regardless
        //appointmentData.date = moment(this.state.appointmentData.date).format('DD-MM-YYYY');
        //Other data processing moved server side for flexibility and security

        //appointmentData object is passed manually since state batch is not updated quick enougth, also avoid mutation of state if request unsuccessful
        this.sendData(appointmentData)
    };

    sendData = (appointmentData) => {
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
                    <p id={"feedbackParagraph"}>
                        {this.state.errorFeedback}
                    </p>
                    <div className ="FormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <div> Give us the information to contact you</div>
                            <FormGroup controlId="title" bsSize="large">
                                <ControlLabel>Appointment title</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.appointmentData.title}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <div className="row">
                                <p>Enter the appointment starting time</p>
                                <div className="col-md-3">
                                    <FormGroup controlId="startTimeHours" bsSize="large">
                                        <ControlLabel>Enter hours</ControlLabel>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.appointmentData.startTimeHours}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-md-3">
                                    <FormGroup controlId="startTimeMinutes" bsSize="large">
                                        <ControlLabel>Enter minutes</ControlLabel>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={this.state.appointmentData.startTimeMinutes}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>

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
                                    id="date"
                                    value={this.state.appointmentData.date}
                                    onDayChange={this.handleDayChange}
                                    dayPickerProps={{
                                        id: "date",
                                        selectedDays: this.state.appointmentData.date,
                                        disabledDays: {
                                            daysOfWeek: [0, 0],
                                        },
                                    }}
                                />
                            </FormGroup>

                            <FormGroup controlId="breedStandard" bsSize="large">
                                <ControlLabel>Enter breed standard information</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    placeholder="optional"
                                    value={this.state.appointmentData.breedStandard}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="coatRemoval" bsSize="large">
                                <ControlLabel>Enter coat removal information</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    placeholder="optional"
                                    value={this.state.appointmentData.coatRemoval}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="handstrip" bsSize="large">
                                <ControlLabel>Does your dog need a handstrip</ControlLabel>
                                <Checkbox id="handstrip" checked={this.state.appointmentData.handstrip} onChange={this.handleToggle} > Yes </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="notes" bsSize="large">
                                <ControlLabel>Enter any notes</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    placeholder="optional"
                                    value={this.state.appointmentData.notes}
                                    onChange={this.handleChange}
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
            </div>
        )

    }
}
