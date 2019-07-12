import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
//TODO Figure out why dates are not getting converted to and from UTC properly (and hence calendar info is wrong)

//import sampleEvents from './SampleEvents.js'
//import dates from './dates.js'
import 'react-big-calendar/lib/css/react-big-calendar.css'

let localizer = BigCalendar.momentLocalizer(moment)
//let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

export default class NavBar extends Component {
    //Format appointmentData for calendar
    formatAppointmentData = () => {
        let formattedADL = []
        for (let i=0; i<this.props.appointmentDataList.length; i++ ) {
            formattedADL[i] = {id: i, title: this.props.appointmentDataList[i].title, start: new Date(this.props.appointmentDataList[i].start_date), end: new Date(this.props.appointmentDataList[i].end_date)}
        }
        return formattedADL
    }
    render() {
        //console.log(this.props.appointmentDataList.map((appointmentData, index) => ({id: index, title: appointmentData.title, start: appointmentData.start_date, end: appointmentData.end_date})))
        console.log(this.props.appointmentDataList)
        console.log(this.formatAppointmentData())
        return(
            <BigCalendar
                events={this.formatAppointmentData()}
                localizer={localizer}
                step={60}
                showMultiDayTimes
                defaultDate = {new Date(new Date().setHours(new Date().getHours() - 3))}
            />
        )
    }
}

/*
let AppointmentCalendar = () => {
    console.log(this.props.appointmentData)
    return(
    <BigCalendar
        events={sampleEvents}
        localizer={localizer}
        step={60}
        showMultiDayTimes
        defaultDate = {new Date(new Date().setHours(new Date().getHours() - 3))}
    />
    )
}
export default AppointmentCalendar
 */