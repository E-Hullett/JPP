//Go back one directory
//Model for interacting with cities stored in the database
const db = require('../database');

class Users {
    //Callback is the function passed, results or error ar returned to the callback
    static retrieveAll (callback){
        db.query('SELECT * from users' , (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (city, callback) {
        db.query('INSERT INTO Users (UserID) VALUES ($1)', [UserID], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Users;