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

    //
    formatAppointment(appointmentData){
        //Calculate end time of appointment using start time and estimated duration
        console.log(appointmentData)
        let duration = 1
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