import React, { Suspense, lazy, Component } from 'react';
import NavBar from '../js/widgets/NavBar'
//import Footer from '../widgets/Footer'
//import Jumbotron from '../widgets/Jumbotron'
import '../css/dashboard.css'
//import AppointmentCalendar from './BigCalendar'
//import moment from 'moment'

//TODO Find a way to keep the user logged in after the page refreshes (session cookies)
//TODO Adds sampleEvents and event booking to calendar, attach event calendar to a new table
//TODO Add a way to remove all user data

//TODO Load appointmentData returned by promise into the calendar

const AppointmentCalendar = lazy(() => { import AppointmentCalendar from './BigCalendar'}

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        //Set the passed state = to the local state
        this.state = this.props.location.state
        this.state.appointmentData = ""
    }
    componentDidMount(){
        let appointmentData = this.retrieveAppointments()
    }

    //Get the users appointment data so that it can be displayed in the table
     //await waits for a promise to resolve before continuing execution, so no .then() is needed, so we can assign the final result and use it when rendering the appointment component
   retrieveAppointments =  async () => {
        return await fetch('/api/users/retrieveAppointments', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({currentLogin: this.state.currentLogin})
        })
    }

    render(){
        //Gif displayed when waiting for the appoints to be retrieved for the appointment calendar
        const loadingImg = <div className="album-img">
            <img alt="loading" src="https://media.giphy.com/media/y1ZBcOGOOtlpC/200.gif" />
        </div>
        return(
            <div>
                <NavBar loginStatus={this.state.loginStatus} currentLogin={this.state.currentLogin} />
                <div className="container">
                    <div id={"AC_Container"}>
                        <h2>Appointment calendar</h2>
                        <Suspense key={e.id.label} fallback={loadingImg}>
                            <AppointmentCalendar />
                        </Suspense>
                    </div>
                </div>

            </div>
        )
    }
}
//81fcbdf3ad18493aa9bc6a22512fa13c
//987c5e5484d5465f97b77089c208a7c8
