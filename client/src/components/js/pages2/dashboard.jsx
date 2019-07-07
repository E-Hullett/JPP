import React, { Component } from 'react';
import NavBar from '../widgets/NavBar'
//import Footer from '../widgets/Footer'
//import Jumbotron from '../widgets/Jumbotron'
import '../../css/dashboard.css'
import AppointmentCalendar from './BigCalendar'

//TODO Find a way to keep the user logged in after the page refreshes (session cookies)
//TODO Adds events and event booking to calendar, attach event calendar to a new table
//TODO Add a way to remove all user data
//TODO Test appointment data functionality, allow the customer to enter appointments, load events from the appointments API into the calendar



export default class Dashboard extends Component {
    constructor(props){
        super(props);
        //Set the passed state = to the local state
        this.state = this.props.location.state
    }
    componentDidMount(){
        this.retrieveAppointments()
    }
    //Get the users appointment data so that it can be displayed in the table
    retrieveAppointments = () => {
        fetch('/api/users/retrieveAppointments', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({currentLogin: this.state.currentLogin})
        }).then(res => res.json()).then(res => {
            console.log(res)
        })

    }

    render(){
        return(
            <div>
                <NavBar loginStatus={this.state.loginStatus} currentLogin={this.state.currentLogin} />
                    <div className="container">
                        <div id={"AC_Container"}>
                            <h2>Appointment calendar</h2>
                            <AppointmentCalendar />
                        </div>
                    </div>

            </div>
        )
    }
}
//81fcbdf3ad18493aa9bc6a22512fa13c
//987c5e5484d5465f97b77089c208a7c8
//