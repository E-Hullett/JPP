import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import sampleEvents from './SampleEvents.js'
//import dates from './dates.js'
import 'react-big-calendar/lib/css/react-big-calendar.css'

let localizer = BigCalendar.momentLocalizer(moment)
//let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

//Format appointmentData for calendar
let formatAppointmentData = () => {
    console.log("To be updated")
}

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


/*
let AppointmentCalendar = () => (
        <BigCalendar
            events={sampleEvents}
            localizer={localizer}
            step={60}
            showMultiDayTimes
            defaultDate = {new Date(new Date().setHours(new Date().getHours() - 3))}
        />
    )
 */