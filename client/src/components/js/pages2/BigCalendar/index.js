import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import events from './events.js'
//import dates from './dates.js'
import 'react-big-calendar/lib/css/react-big-calendar.css'

let localizer = BigCalendar.momentLocalizer(moment)
//let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let AppointmentCalendar = () => (
    <BigCalendar
        events={events}
        localizer={localizer}
        step={60}
        showMultiDayTimes
    />
)

export default AppointmentCalendar
