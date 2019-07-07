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

    hashPassword(password){
        return hash.sha256().update(password).digest('hex')
    }


}

module.exports = new (Operations);


/*
console.log(loginAttempt.password)
console.log(loginAccount.password)
console.log(typeof loginAttempt.password)
console.log(typeof loginAccount.password)
*/