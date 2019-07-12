var hash = require('hash.js')
class Operations{

    authenticate(loginAccount, loginAttempt){
        //Hash the passed password to see if it matches the hash in the db
         loginAttempt.password = hash.sha256().update(loginAttempt.password).digest('hex')
        if (loginAccount.password === loginAttempt.password){
            return {user_id: loginAccount.user_id, email: loginAccount.email, username: loginAccount.username, authResult: true}
        }else{
            return {authResult: false}
        }

    }
    //Hash password for security
    hashPassword(password){
        return hash.sha256().update(password).digest('hex')
    }

    //Format client requests to add appointments
    formatAppointment(appointmentData){
        //Add time to ISO UTC date and generate start/end dates for event calendar
         //Dates stored in timestampz in postgres

        let startDate = new Date(appointmentData.date)
        startDate.setUTCHours(appointmentData.startTimeHours)
        startDate.setUTCMinutes(appointmentData.startTimeMinutes)
        appointmentData.startDate = startDate

        //Calculate end date by adding expected duration of appointment
        let duration = 1
        let endDate = new Date(appointmentData.date)
        endDate.setUTCHours((parseInt(appointmentData.startTimeHours) + duration))
        endDate.setUTCMinutes(appointmentData.startTimeMinutes)
        appointmentData.endDate = endDate

        //Format start time
        appointmentData.startTime = `${appointmentData.startTimeHours}:${appointmentData.startTimeMinutes}:00`
        //Calculate end time of appointment using start time and estimated duration
        appointmentData.endTime = `${(parseInt(appointmentData.startTimeHours) + duration)}:${appointmentData.startTimeMinutes}:00`

        //Calculate fee , //TODO change fee based on users stored status (EG discount % for friends)
        let fee = 50
        appointmentData.fee = fee

        return (appointmentData)
    }
}

module.exports = new (Operations);


/*
console.log(loginAttempt.password)
console.log(loginAccount.password)
console.log(typeof loginAttempt.password)
console.log(typeof loginAccount.password)
*/