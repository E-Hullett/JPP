
/*
import moment from "moment";
console.log(moment("20/1/2016").format('DD-MM-YYYY'));
 */


//moment(`${date3} ${time3}`, 'YYYY-MM-DD HH:mm:ss').format()

import moment from "./client/src/components/js/pages2/dashboard";

date = new Date("2019-07-09T23:00:00.000Z")
date.setSeconds(20)
console.log(date)


componentDidMount(){
    let appointmentData = this.retrieveAppointments().then(res => console.log(res))
    console.log(appointmentData)
    const date3 = '2019-07-18T11:00:00.000Z';
    const time3 = "23:59:59"
    console.log(moment(`${date3} ${time3}`, 'YYYY-MM-DD HH:mm:ss').format())
}

//Get the users appointment data so that it can be displayed in the table
retrieveAppointments = () => {
    return fetch('/api/users/retrieveAppointments', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({currentLogin: this.state.currentLogin})
    }).then(res => res.json()).then(res => {
        return res
    })

}

const date3 = '2019-07-18T11:00:00.000Z';
const time3 = "23:59:59"
console.log(moment(`${date3} ${time3}`, 'YYYY-MM-DD HH:mm:ss').format())