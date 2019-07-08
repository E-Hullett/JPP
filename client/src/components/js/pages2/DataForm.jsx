import React, { Component } from 'react';
import NavBar from "../widgets/NavBar";
import {Button, ControlLabel, FormControl, FormGroup, Checkbox} from "react-bootstrap";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment'
import 'react-day-picker/lib/style.css';
//import update from 'immutability-helper';
//import Jumbotron from "../widgets/Jumbotron";
//import Footer from "../widgets/Footer";
//TODO, create figure out how to connect user_id as a foriegn key to users table, complete form, including all inputs so that it looks like the customer-data table
export default class DataForm extends Component {
    constructor(props){
        super(props);
        //Set the passed state = to the local state (to get login details)
        this.state = this.props.location.state;
        this.state.alreadyEnteredData = false;
        this.state.validationErrors = [];
        this.state.errorList = []
        this.state.dataForm = {
            address: "",
            mobile: "",
            petsName: "",
            DOB: "",
            breed: "",
            gender: "",
            colour: "",
            microchipNumber: "",
            haveTattoo_b: false,
            tattooLocation: "",
            neutralised_b: false,
            vetName: "",
            vetMobile: "",
            ECNname: "",
            ECNrelationship: "",
            ECNnumber: "",
            havePreferencesDislikes: false,
            preferencesDislikes: "",
            havePreferencesLikes: false,
            preferencesLikes: "",
            shampoo: "",
            sheerNoWinter: "",
            sheerNoSummer: "",
            OUD: "",
            contagions: [0, 0, 0, 0, 0, 0, 0, 0],
            otherContagions: "",
            healthImpairments: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            otherHealthImpairments: "",
            behaviouralAttributes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            otherBehaviouralAttributes: "",
            currentDate: ""
        };
        this.state.datePicker = {
            isEmpty: true,
            isDisabled: false,
        }
    }
    //Call function as soon as the DOM is rendered, but only once (not run again until page refresh)
    componentDidMount(){
        this.alreadySubmittedAForm()
        let errorList = ["No error check yet performed"]
        this.setState({errorList: errorList})
    }

    //Check if the user has already submitted a dataForm
    alreadySubmittedAForm(){
        fetch('/api/users/dataFormCheck', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({currentLogin: this.state.currentLogin})
        }).then(res => res.json()).then(res => {
            // noinspection JSUnresolvedVariable
            //console.log(res[0].user_id);
            if (typeof res[0].user_id === "undefined"){
                document.getElementById("feedbackParagraph").innerHTML = "You haven't filled out a dataForm yet"
                this.setState({alreadyEnteredData: false})
            }else{
                document.getElementById("feedbackParagraph").innerHTML = "You have already filled out a dataForm"
                document.getElementById("feedbackParagraph2").innerHTML = "Your previous entries have been updated, if you wish to edit your data then re-submit the form after your changes"
                this.setState({alreadyEnteredData: true})
                //Insert previous dataForm enteries into the form, so the user can change just what they want
                this.insertPreviousDF(res[0])

            }

        }).catch((TypeError) => {
            document.getElementById("feedbackParagraph").innerHTML = "You haven't filled out a dataForm yet"
            this.setState({alreadyEnteredData: false})
            //Triggers generic error if an error other than a TypeError is returned
        }).catch((err)=> {
            console.log("An error occurred at dataForm genericError")
        })
    }

    //If the user has already filled out a form, then this mehtod is called and their data is inserted. Their previous entries are passed as a parameter
    insertPreviousDF = (PE) => {
        let dataForm = {...this.state.dataForm}
        console.log(PE)
        //Account for state values that are not included in the passed response object
        if (PE.tattoo_location !== ""){
            PE.haveTattoo_b = true
        }else{PE.haveTattoo_b = false}
        if (PE.preferences_dislikes !== ""){
            PE.havePreferencesDislikes = true
        }else{PE.havePreferencesDislikes = false}
        if (PE.preferences_likes !== ""){
            PE.havePreferencesLikes = true
        }else{PE.havePreferencesLikes = false}

        Object.assign(dataForm, {
            address: PE.address,
            mobile: PE.mobile,
            petsName: PE.pets_name,
            DOB: new Date(PE.dob),
            breed: PE.breed,
            gender: PE.gender,
            colour: PE.colour,
            microchipNumber: PE.microchip_number,
            haveTattoo_b: PE.haveTattoo_b,
            tattooLocation: PE.tattoo_location,
            neutralised_b: PE.neutralised_b,
            vetName: PE.vet_name,
            vetMobile: PE.vet_mobile,
            ECNname: PE.emergency_contact_name,
            ECNrelationship: PE.emergency_contact_relationship,
            ECNnumber: PE.emergency_contact_mobile,
            havePreferencesDislikes: PE.havePreferencesDislikes,
            preferencesDislikes: PE.preferences_dislikes,
            havePreferencesLikes: PE.havePreferencesLikes,
            preferencesLikes: PE.preferences_likes,
            shampoo: PE.shampoo,
            sheerNoWinter: PE.sheer_number_in_winter,
            sheerNoSummer: PE.sheer_number_in_summer,
            OUD: PE.other_useful_details,
            contagions: [PE.fleas, PE.mite, PE.worms, PE.ticks, PE.lice, PE.mange, PE.cough, PE.long_worm],
            otherContagions: PE.other_contagion,
            healthImpairments: [PE.heart, PE.sight, PE.ears, PE.balance, PE.a_glandis, PE.ringworm, PE.hip_dysp, PE.eczema, PE.allergies, PE.arthritis, PE.diabetes, PE.incontinence, PE.warts],
            otherHealthImpairments: PE.other_health,
            behaviouralAttributes: [PE.shy, PE.good, PE.noisy, PE.fights, PE.soils_waste, PE.escapes, PE.highly_strung, PE.bite, PE.muzzle, PE.climbs, PE.chewy],
            otherBehaviouralAttributes: PE.other_behaviour,
            currentDate: ""})
        this.setState({dataForm: dataForm})
        //Multi-select boxes need to be updated (selected) manually
        let contagionList = [PE.fleas, PE.mite, PE.worms, PE.ticks, PE.lice, PE.mange, PE.cough, PE.long_worm]
        let contagion = document.getElementById('contagions')
        for ( let i = 0; i < contagion.options.length; i++ ){
            if(contagionList[i] === 1){
                contagion.options[i].selected = true;
            }
        }
        let healthImpairmentsList = [PE.heart, PE.sight, PE.ears, PE.balance, PE.a_glandis, PE.ringworm, PE.hip_dysp, PE.eczema, PE.allergies, PE.arthritis, PE.diabetes, PE.incontinence, PE.warts]
        let healthImpairments = document.getElementById('healthImpairments')
        for ( let i = 0; i < healthImpairments.options.length; i++ ){
            if(healthImpairmentsList[i] === 1){
                healthImpairments.options[i].selected = true;
            }
        }
        let behaviouralAttributesList = [PE.shy, PE.good, PE.noisy, PE.fights, PE.soils_waste, PE.escapes, PE.highly_strung, PE.bite, PE.muzzle, PE.climbs, PE.chewy]
        let behaviouralAttributes = document.getElementById('behaviouralAttributes')
        for ( let i = 0; i < behaviouralAttributes.options.length; i++ ){
            if(behaviouralAttributesList[i] === 1){
                behaviouralAttributes.options[i].selected = true;
            }
        }

    }

    validateForm(){
        //If problems are picked up return false
        return (!this.state.errorList.length > 0)
    }

    validateCheck = () => {
        let DF = this.state.dataForm
        let errorList = []
        //Optional and longer entries sorted to the end of textEntryList
        var textEntryList = [DF.address, DF.petsName, DF.breed, DF.gender, DF.colour, DF.vetName, DF.ECNname,
            DF.ECNrelationship, DF.shampoo, DF.OUD, DF.otherContagions, DF.otherHealthImpairments,
            DF.otherBehaviouralAttributes]
        //Check non-optional entries are not blank
        for(let i=0;i<textEntryList.length; i++){
            if(i<8) if(textEntryList[i] === "") {errorList.push("Empty non-optional entries"); break; }
        }
        //Check if entries are ridiculously long
        for(let i=0;i<textEntryList.length;i++){
            //Impose lower max character limit for options that may contain lots of text
            if((i)<9) {if (textEntryList[i].length > 15) {errorList.push("Unnecessarily long entry"); break}
            }else{ if(textEntryList[i].length > 30) {errorList.push("Unnecessarily long entry"); break}
            }
        }
        //Check entries
        let numberList = [DF.mobile, DF.vetMobile, DF.ECNnumber]
        //numberList.forEach((i)=> {if((/^[0-9]*$/).test(i))errorList.push("Letters or invalid characters in phone numbers")})
        for(let i=0;i<=2;i++){
            //if((/^[0-9]+$/).test(numberList[i])){errorList.push("Letters or invalid characters in phone numbers"); break;}
            if((/\D/g).test(numberList[i])){ console.log(numberList[i]); errorList.push("Letters or invalid characters in phone numbers"); break;}
        }
        //Check for correct sheer number format, triggers when all possible formats are absent, EG: 5F, 1/2", 1/2, 4, 43. scissors WHERE the number can be any integer and the letter can be any letter
        let sheerList = [DF.sheerNoWinter, DF.sheerNoSummer]
        for (let i=0;i<=1;i++){
            //Shorthand variable
            let SN = sheerList[i]
            if(!(/[0-9][a-z]/i).test(SN) || !(/[0-9][/][0-9]?"/).test(SN) || !(/[0-9]/).test(SN) || !(/[0-9][0-9]/).test(SN) || !(SN.toLowerCase()==="scissors")) {
                errorList.push("Incorrect format for sheer number")
                break;
            }
        }
        /*
        //Check address
        if (!("/+@+/".test(this.state.dataForm.address))) errorList.push("Address is invalid");
        */


        //Check DOB is valid
        if (!(/\d{4}[-]\d{1,2}[-]\d{1,2}$/).test(DF.DOB))errorList.push("Incorrect format for DOB")
        let parts = DF.DOB.split("-")
        if(parseInt(parts[0],10) < 1000 || parseInt(parts[0], 10) > 3000 || parseInt(parts[1], 10) === 0 || parseInt(parts[1], 10) > 12 || parseInt(parts[2], 10) > 31)errorList.push("Date out of range")

        this.setState({errorList: errorList})
    }


    //Entries
    handleChange = event => {
        //this.setState({[event.target.id]: event.target.value });
        this.setState({dataForm:{ ...this.state.dataForm, [event.target.id]: event.target.value}})
        this.validateCheck()
        }

     //Checkboxes
    handleToggle = event => {
        //...State is set so that only the required property is changed, hence not triggering controlled -> uncontrolled react error
        this.setState({dataForm:{ ...this.state.dataForm, [event.target.id]: event.target.checked}})
        //console.log(event.target.checked)
    }

    //Multi-selection
    handleSelection = event => {
        //Get the list of options
        let options = event.target.options
        //Add selected options to a list
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected){
                //console.log(event.target.options[i].id)
                //value.push(options[i].id);
                value.push(1);
            }else{value.push(0)}
        }
        //Update state with selected options
        this.setState({dataForm:{ ...this.state.dataForm, [event.target.id]: value}})
    }

    //For imported date picker
    handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        //state needs to be sent differently since the normal event object is not passed
        this.setState((state) => ({dataForm: {...state.dataForm, DOB: selectedDay}}))
        //this.setState({dataForm:{ ...this.state.dataForm, [dayPickerInput.props.id]: selectedDay}})
        //this.setState({dataForm: {DOB: selectedDay }})
        //this.setState({datePicker:{isEmpty: !input.value.trim() }})
        //this.setState({datePicker:{isDisabled: modifiers.disabled === true}})
        this.setState({datePicker:{ ...this.state.datePicker, [this.state.datePicker.isEmpty]: !input.value.trim() }})
        this.setState({datePicker:{ ...this.state.datePicker, [this.state.datePicker.isDisabled]: modifiers.disabled === true }})
    }

    handleSubmit = event => {
        event.preventDefault();
        //Format values in dataForm so it is in the correct format to be sent to the api
        //Set up a dataForm replica to be updated with the new values, it will then be replaced with the old dataForm
        let dataForm = {...this.state.dataForm}

        //If the user clicked yes to tattoo, entered data, and then pressed no, then the value is set to empty
        if(this.state.dataForm.haveTattoo_b === false){
            //this.setState({dataForm:{ ...this.state.dataForm, [this.state.dataForm.tattooLocation]: ""}})
            dataForm.tattooLocation = ""
        }
        if(this.state.dataForm.havePreferencesDislikes === false){
            //this.setState({dataForm:{ ...this.state.dataForm, [this.state.dataForm.preferencesDislikes]: ""}})
            dataForm.preferencesDislikes = ""
        }
        if(this.state.dataForm.havePreferencesLikes === false){
            //this.setState({dataForm:{ ...this.state.dataForm, [this.state.dataForm.preferencesLikes]: ""}})
            dataForm.preferencesLikes = ""
        }
        //Check if selection boxes have been left blank, if they have the insert 0s for all values

        //Configure DOB to correct format
        /*
        let splitDate = this.state.dataForm.DOB.toString().split(' ')
        //Convert month to a number
        let monthNumber = 0
        let monthList = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        for (let i=0; i<=11; i++ ){
            if(splitDate[1] === monthList[i]){
                monthNumber=i+1
                break;
            }
        }
        let convertedDate = `${splitDate[3]}-${monthNumber}-${splitDate[2]}`
        dataForm.DOB = convertedDate
        */
        dataForm.DOB = moment(this.state.dataForm.DOB).format('DD-MM-YYYY');


        //Get current date and format it
        // Format DOB selected, previous format for DOB: Thu Dec 06 2018 12:00:00 GMT+0000 (Greenwich Mean Time)
        let date = new Date();
        let today = (`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
        dataForm.currentDate = today

        //Replace old state dataForm with the new replica
        //this.setState({dataForm: dataForm})
        this.setState((state) => ({
            dataForm: dataForm
        }));

        //dataForm object is passed manually since state batch is not updated quick enougth
        this.sendData(dataForm)
    };

    sendData = (dataForm) => {
        //console.log(dataForm)
        //Send data to postgres server
        fetch('/api/users/dataFormSubmit', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({dataSubmit:{
                    currentLogin: this.state.currentLogin,
                    dataForm: dataForm,
                    alreadyEnteredData: this.state.alreadyEnteredData }
            })
        }).then(res => res.json()).then(res => {
            //console.log(res)
            //Go back to dashboard after data is submitted
            this.props.history.push({
                pathname: '/dashboard',
                state: { currentLogin: this.state.currentLogin, loginStatus: this.state.loginStatus, }
            })
        }).catch((err)=> {
            console.log("An error occurred")
        })
    }

    render(){
        //console.log(this.state.currentLogin)
        return(
            <div className="dataForm">
                <NavBar loginStatus={this.state.loginStatus} currentLogin={this.state.currentLogin} />
                <div className="container">
                    <h2> Submit customer data</h2>
                    <p id="feedbackParagraph">

                    </p>
                    <p id="feedbackParagraph2">
                        You only need to do this once so that we have information required to look after your pet
                    </p>

                    <div className ="FormContainer">
                        <form onSubmit={this.handleSubmit}>
                            <div> Give us the infomation to contact you</div>
                            <FormGroup controlId="address" bsSize="large">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.state.dataForm.address}
                                    onChange={this.handleChange}

                                />
                            </FormGroup>
                            <FormGroup controlId="mobile" bsSize="large">
                                <ControlLabel>Mobile</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.mobile}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <div> Tell us about your dog</div>
                            <FormGroup controlId="petsName" bsSize="large">
                                <ControlLabel>Pets name</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.petsName}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="DOB" bsSize="large">
                                <ControlLabel>Date of birth</ControlLabel>
                                    <p>
                                        {this.state.datePicker.isEmpty && 'Please type or pick a day'}
                                        {!this.state.datePicker.isEmpty && !this.state.dataForm.DOB && 'This day is invalid'}
                                        {this.state.dataForm.DOB && this.state.datePicker.isDisabled && 'This day is disabled'}
                                        {this.state.dataForm.DOB && !this.state.datePicker.isDisabled}
                                        {/*&& `You chose ${this.state.dataForm.DOB.toLocaleDateString()}`} */   }
                                    </p>
                                    <DayPickerInput
                                        id="DOB"
                                        value={this.state.dataForm.DOB}
                                        onDayChange={this.handleDayChange}
                                        dayPickerProps={{
                                            id: "DOB",
                                            selectedDays: this.state.dataForm.DOB,
                                            disabledDays: {
                                                daysOfWeek: [0, 0],
                                            },
                                        }}
                                    />
                            </FormGroup>
                            <FormGroup controlId="breed" bsSize="large">
                                <ControlLabel>Dog breed</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.breed}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="gender" bsSize="large">
                                <ControlLabel>Dog gender</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.gender}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="colour" bsSize="large">
                                <ControlLabel>Colour</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.colour}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>

                            <FormGroup controlId="microchipNumber" bsSize="large">
                                <ControlLabel>Microchip number</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.microchipNumber}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="haveTattoo_b" bsSize="large">
                                <ControlLabel>Does your dog have a tattoo?</ControlLabel>
                                {/* <Checkbox value={this.state.dataForm.haveTattoo_b} onClick={ ()=> { this.setState({dataForm:{haveTattoo_b: !this.state.haveTattoo_b}}); console.log(this.state.dataForm.haveTattoo_b)} }>Yes</Checkbox> */}
                                <Checkbox id="haveTattoo_b" checked={this.state.dataForm.haveTattoo_b} onChange={this.handleToggle} > Yes </Checkbox>
                            </FormGroup>

                            <FormGroup controlId="tattooLocation" bsSize="large">
                                <ControlLabel>Tattoo Location</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.tattooLocation}
                                    onChange={this.handleChange}
                                    type="text"
                                    disabled={!this.state.dataForm.haveTattoo_b}
                                />
                            </FormGroup>
                            <FormGroup controlId="neutralised_b" bsSize="large">
                                <ControlLabel>Is your dog neutralised? (Has her reproductive organs been removed)</ControlLabel>
                                {/* <Checkbox value={this.state.dataForm.haveTattoo_b} onClick={ ()=> { this.setState({dataForm:{haveTattoo_b: !this.state.haveTattoo_b}}); console.log(this.state.dataForm.haveTattoo_b)} }>Yes</Checkbox> */}
                                <Checkbox id="neutralised_b" checked={this.state.dataForm.neutralised_b} onChange={this.handleToggle} > Yes, my dog has been neutralised </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="vetName" bsSize="large">
                                <ControlLabel>Vet name</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.vetName}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="vetMobile" bsSize="large">
                                <ControlLabel>Vet Mobile</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.vetMobile}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>

                            <FormGroup controlId="ECNname" bsSize="large">
                                <ControlLabel>Emergency contact name</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.ECNname}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="ECNrelationship" bsSize="large">
                                <ControlLabel>Emergency contact relationship</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.ECNrelationship}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="ECNnumber" bsSize="large">
                                <ControlLabel>Emergency contact Mobile</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.ECNnumber}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>

                            <FormGroup controlId="havePreferencesDislikes" bsSize="large">
                                <ControlLabel>Does you dog have specific dislikes?</ControlLabel>
                                {/* <Checkbox value={this.state.dataForm.haveTattoo_b} onClick={ ()=> { this.setState({dataForm:{haveTattoo_b: !this.state.haveTattoo_b}}); console.log(this.state.dataForm.haveTattoo_b)} }>Yes</Checkbox> */}
                                <Checkbox id="havePreferencesDislikes" checked={this.state.dataForm.havePreferencesDislikes} onChange={this.handleToggle} > Yes </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="preferencesDislikes" bsSize="large">
                                <ControlLabel>Preferences Dislikes</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.preferencesDislikes}
                                    onChange={this.handleChange}
                                    type="text"
                                    disabled={!this.state.dataForm.havePreferencesDislikes}
                                />
                            </FormGroup>

                            <FormGroup controlId="havePreferencesLikes" bsSize="large">
                                <ControlLabel>Does your dog have specific likes?</ControlLabel>
                                {/* <Checkbox value={this.state.dataForm.haveTattoo_b} onClick={ ()=> { this.setState({dataForm:{haveTattoo_b: !this.state.haveTattoo_b}}); console.log(this.state.dataForm.haveTattoo_b)} }>Yes</Checkbox> */}
                                <Checkbox id="havePreferencesLikes" checked={this.state.dataForm.havePreferencesLikes} onChange={this.handleToggle} > Yes </Checkbox>
                            </FormGroup>
                            <FormGroup controlId="preferencesLikes" bsSize="large">
                                <ControlLabel>Preferences Likes</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.preferencesLikes}
                                    onChange={this.handleChange}
                                    type="text"
                                    disabled={!this.state.dataForm.havePreferencesLikes}
                                />
                            </FormGroup>

                            <FormGroup controlId="shampoo" bsSize="large">
                                <ControlLabel>Shampoo (optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.shampoo}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="sheerNoWinter" bsSize="large">
                                <ControlLabel>Sheer number in winter (Optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.sheerNoWinter}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="sheerNoSummer" bsSize="large">
                                <ControlLabel>Sheer number in summer (Optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.sheerNoSummer}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="OUD" bsSize="large">
                                <ControlLabel>Other useful details (optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.OUD}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup controlId="contagions">
                                <ControlLabel>Select any contagions your dog has:</ControlLabel>
                                <FormControl componentClass="select" multiple onChange={this.handleSelection}>
                                    <option id="fleas_b">Fleas</option>
                                    <option id="mite_b">Mite</option>
                                    <option id="worms_b">Worms</option>
                                    <option id="ticks_b">Ticks</option>
                                    <option id="lice_b">Lice</option>
                                    <option id="mange_b">Mange</option>
                                    <option id="cough_b">Cough</option>
                                    <option id="longWorm_b">Long worm</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="otherContagions" bsSize="large">
                                <ControlLabel>Enter any other contagion (optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.otherContagions}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>

                            <FormGroup controlId="healthImpairments">
                                <ControlLabel>Select any Health Impairments your dog has:</ControlLabel>
                                <FormControl componentClass="select" multiple onChange={this.handleSelection}>
                                    <option id="heart_b">Heart</option>
                                    <option id="sight_b">Sight</option>
                                    <option id="ears_b">Ears</option>
                                    <option id="balance_b">Balance</option>
                                    <option id="aGlandis_b">A Glandis</option>
                                    <option id="ringworm_b">Ringworm</option>
                                    <option id="hipDysp_b">Hip Dysp</option>
                                    <option id="eczema_b">Eczema</option>
                                    <option id="allergies_b">Allergies</option>
                                    <option id="arthritis_b">Arthritis</option>
                                    <option id="diabetes_b">Diabetes</option>
                                    <option id="incontinence_b">Incontinence</option>
                                    <option id="warts_b">Warts</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="otherHealthImpairments" bsSize="large">
                                <ControlLabel>Enter any other Health Impairments or notes about health (optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.otherHealthImpairments}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </FormGroup>

                            <FormGroup controlId="behaviouralAttributes">
                                <ControlLabel>Select any Behavioural Attributes your dog has:</ControlLabel>
                                <FormControl componentClass="select" multiple onChange={this.handleSelection}>
                                    <option id="shy_b">Shy</option>
                                    <option id="good_b">Good</option>
                                    <option id="noisy_b">Noisy</option>
                                    <option id="fights_b">Fights</option>
                                    <option id="soilsWaste_b">Soils or Waste</option>
                                    <option id="escapes_b">Escapes</option>
                                    <option id="highlyStrung_b">Highly strung</option>
                                    <option id="bite_b">Bite</option>
                                    <option id="Muzzle_b">Muzzle</option>
                                    <option id="Climbs_b">Climbs</option>
                                    <option id="Chewy_b">Chewy</option>
                                </FormControl>
                            </FormGroup>
                            <FormGroup controlId="otherBehaviouralAttributes" bsSize="large">
                                <ControlLabel>Enter any other Behavioural Attribute or notes about behaviour (optional)</ControlLabel>
                                <FormControl
                                    value={this.state.dataForm.otherBehaviouralAttributes}
                                    onChange={this.handleChange}
                                    type="text"
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