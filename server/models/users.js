//Go back one directory
//Model for interacting with cities stored in the database
const db = require('../database');
const op = require('../operations');

class Users {
    //Callback is the function passed, results or error ar returned to the callback
    static retrieveViaEmail (requestBody, callback){
        //SQL`SELECT * FROM users WHERE email = ${email}`
        db.query('SELECT * FROM users WHERE email = ($1)', requestBody.email, (err, res) => {
            if (err.error) return callback(err);
            //Check if the request property is login

            if (requestBody.request === "login"){
                //Check password against identified account and chose infomation to be returned to the client
                res[0] = op.authenticate(res[0], requestBody)
                callback(res)
            }else if (requestBody.request === "register"){
                //Make sure the email is not taken before an insert request is made
                if (typeof res[0] === "undefined"){
                    callback({emailExists: false})
                }else{
                    callback({emailExists: true})
                }
            }else{
                callback(res)
            }

        })
    }

    static insert (requestBody, callback){
        requestBody.password = op.hashPassword(requestBody.password)
        db.query('INSERT INTO Users (user_id, email, username, password, status) VALUES ($1, $2, $3, $4, $5)', requestBody.user_id,
            requestBody.email, requestBody.username, requestBody.password, "User", (err, res) => {
            if (err.error) return callback(err);
            callback(res);
        })
    }
    static dataFormRetrieveViaUserID (requestBody, callback){
        //console.log(`user_id to check: ${requestBody.currentLogin.user_id}`)
        db.query('SELECT * FROM customer_data WHERE user_id = ($1)', requestBody.currentLogin.user_id, (err, res) => {
            //console.log(`Data retrieved ${res[0].user_id}`)
            if (err.error) return callback(err);
            callback(res);
        })
    }

    static dataFormUpdate (requestBody, callback){
        console.log("Update attempted")
        db.query('UPDATE customer_data SET address =($1), mobile =($2), pets_name =($3), dob=($4), breed=($5), gender=($6), colour=($7), microchip_number=($8), tattoo_location=($9), neutralised_b=($10), vet_name=($11), vet_mobile=($12), emergency_contact_name=($13), emergency_contact_relationship=($14), emergency_contact_mobile=($15), preferences_dislikes=($16), preferences_likes=($17), shampoo=($18), sheer_number_in_winter=($19), sheer_number_in_summer=($20), other_useful_details=($21), fleas=($22), mite=($23), worms=($24), ticks=($25), lice=($26), mange=($27), cough=($28), long_worm=($29), other_contagion=($30), heart=($31), sight=($32), ears=($33), balance=($34), a_glandis=($35), ringworm=($36), hip_dysp=($37), eczema=($38), allergies=($39), arthritis=($40), diabetes=($41), incontinence=($42), warts=($43), other_health=($44), shy=($45), good=($46), noisy=($47), fights=($48), soils_waste=($49), escapes=($50), highly_strung=($51), bite=($52), muzzle=($53), climbs=($54), chewy=($55), other_behaviour=($56), date_current=($57) WHERE user_id = ($58)',
            requestBody.dataForm.address, requestBody.dataForm.mobile,
            requestBody.dataForm.petsName, requestBody.dataForm.DOB, requestBody.dataForm.breed,
            requestBody.dataForm.gender, requestBody.dataForm.colour, requestBody.dataForm.microchipNumber,
            requestBody.dataForm.tattooLocation, requestBody.dataForm.neutralised_b,
            requestBody.dataForm.vetName, requestBody.dataForm.vetMobile, requestBody.dataForm.ECNname,
            requestBody.dataForm.ECNrelationship, requestBody.dataForm.ECNnumber,
            requestBody.dataForm.preferencesDislikes, requestBody.dataForm.preferencesLikes,
            requestBody.dataForm.shampoo, requestBody.dataForm.sheerNoWinter,
            requestBody.dataForm.sheerNoSummer, requestBody.dataForm.OUD, requestBody.dataForm.contagions[0],
            requestBody.dataForm.contagions[1], requestBody.dataForm.contagions[2],
            requestBody.dataForm.contagions[3], requestBody.dataForm.contagions[4],
            requestBody.dataForm.contagions[5], requestBody.dataForm.contagions[6],
            requestBody.dataForm.contagions[7], requestBody.dataForm.otherContagions,
            requestBody.dataForm.healthImpairments[0], requestBody.dataForm.healthImpairments[1],
            requestBody.dataForm.healthImpairments[2], requestBody.dataForm.healthImpairments[3],
            requestBody.dataForm.healthImpairments[4], requestBody.dataForm.healthImpairments[5],
            requestBody.dataForm.healthImpairments[6], requestBody.dataForm.healthImpairments[7],
            requestBody.dataForm.healthImpairments[8], requestBody.dataForm.healthImpairments[9],
            requestBody.dataForm.healthImpairments[10], requestBody.dataForm.healthImpairments[11],
            requestBody.dataForm.healthImpairments[12],
            requestBody.dataForm.otherHealthImpairments, requestBody.dataForm.behaviouralAttributes[0],
            requestBody.dataForm.behaviouralAttributes[1], requestBody.dataForm.behaviouralAttributes[2],
            requestBody.dataForm.behaviouralAttributes[3], requestBody.dataForm.behaviouralAttributes[4],
            requestBody.dataForm.behaviouralAttributes[5], requestBody.dataForm.behaviouralAttributes[6],
            requestBody.dataForm.behaviouralAttributes[7], requestBody.dataForm.behaviouralAttributes[8],
            requestBody.dataForm.behaviouralAttributes[9], requestBody.dataForm.behaviouralAttributes[10],
            requestBody.dataForm.otherBehaviouralAttributes, requestBody.dataForm.currentDate,
            requestBody.currentLogin.user_id, (err, res) => {
                if (err.error) return callback(err);
                callback(res);
            })
    }

    static dataFormInsert (requestBody, callback) {
        /*
        let testList = [ //PASTE elements to test in here]
        testList.forEach((i)=> {console.log(i)})
        */
        db.query('INSERT INTO customer_data (user_id, address, mobile, pets_name, dob, breed, gender, colour, microchip_number, tattoo_location, neutralised_b, vet_name, vet_mobile, emergency_contact_name, emergency_contact_relationship, emergency_contact_mobile, preferences_dislikes, preferences_likes, shampoo, sheer_number_in_winter, sheer_number_in_summer, other_useful_details, fleas, mite, worms, ticks, lice, mange, cough, long_worm, other_contagion, heart, sight, ears, balance, a_glandis, ringworm, hip_dysp, eczema, allergies, arthritis, diabetes, incontinence, warts, other_health, shy, good, noisy, fights, soils_waste, escapes, highly_strung, bite, muzzle, climbs, chewy, other_behaviour, date_current) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58)',
            requestBody.currentLogin.user_id, requestBody.dataForm.address, requestBody.dataForm.mobile,
            requestBody.dataForm.petsName, requestBody.dataForm.DOB, requestBody.dataForm.breed,
            requestBody.dataForm.gender, requestBody.dataForm.colour, requestBody.dataForm.microchipNumber,
            requestBody.dataForm.tattooLocation, requestBody.dataForm.neutralised_b,
            requestBody.dataForm.vetName, requestBody.dataForm.vetMobile, requestBody.dataForm.ECNname,
            requestBody.dataForm.ECNrelationship, requestBody.dataForm.ECNnumber,
            requestBody.dataForm.preferencesDislikes, requestBody.dataForm.preferencesLikes,
            requestBody.dataForm.shampoo, requestBody.dataForm.sheerNoWinter,
            requestBody.dataForm.sheerNoSummer, requestBody.dataForm.OUD, requestBody.dataForm.contagions[0],
            requestBody.dataForm.contagions[1], requestBody.dataForm.contagions[2],
            requestBody.dataForm.contagions[3], requestBody.dataForm.contagions[4],
            requestBody.dataForm.contagions[5], requestBody.dataForm.contagions[6],
            requestBody.dataForm.contagions[7], requestBody.dataForm.otherContagions,
            requestBody.dataForm.healthImpairments[0], requestBody.dataForm.healthImpairments[1],
            requestBody.dataForm.healthImpairments[2], requestBody.dataForm.healthImpairments[3],
            requestBody.dataForm.healthImpairments[4], requestBody.dataForm.healthImpairments[5],
            requestBody.dataForm.healthImpairments[6], requestBody.dataForm.healthImpairments[7],
            requestBody.dataForm.healthImpairments[8], requestBody.dataForm.healthImpairments[9],
            requestBody.dataForm.healthImpairments[10], requestBody.dataForm.healthImpairments[11],
            requestBody.dataForm.healthImpairments[12],
            requestBody.dataForm.otherHealthImpairments, requestBody.dataForm.behaviouralAttributes[0],
            requestBody.dataForm.behaviouralAttributes[1], requestBody.dataForm.behaviouralAttributes[2],
            requestBody.dataForm.behaviouralAttributes[3], requestBody.dataForm.behaviouralAttributes[4],
            requestBody.dataForm.behaviouralAttributes[5], requestBody.dataForm.behaviouralAttributes[6],
            requestBody.dataForm.behaviouralAttributes[7], requestBody.dataForm.behaviouralAttributes[8],
            requestBody.dataForm.behaviouralAttributes[9], requestBody.dataForm.behaviouralAttributes[10],
            requestBody.dataForm.otherBehaviouralAttributes, requestBody.dataForm.currentDate,
            (err, res) => {
                if (err.error) return callback(err);
                callback(res);
            })
    }
    static retrieveAppointments(requestBody, callback){
        db.query('SELECT * FROM  appointments WHERE user_id = ($1)', requestBody.user_id, (err, res) => {
            if (err.error) return callback(err);
            callback(res);
        })
    }
    static addAppointment(requestBody, callback){
        //Format appointmentData so its ready to insert (apply elements that need to be secure or are changed often server side)
        let appointmentData = op.formatAppointment(requestBody.appointmentData)
        console.log(appointmentData)
        console.log(requestBody.currentLogin)
        db.query('INSERT INTO appointments (user_id, title, date, start_time, end_time, breed_standard, coat_removal, handstrip, fee, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            requestBody.currentLogin.user_id, appointmentData.title, appointmentData.date, appointmentData.startTime,
            appointmentData.endTime, appointmentData.breedStandard, appointmentData.coatRemoval,
            appointmentData.handstrip, appointmentData.fee, appointmentData.notes,
            (err, res) => {
                if (err.error) return callback(err);
                callback(res);
            })
    }



}

module.exports = Users;