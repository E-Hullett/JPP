//Go back one directory
//Model for interacting with cities stored in the database
const db = require('../database');

class Cities {
    //Callback is the function passed, results or error ar returned to the callback
    static retrieveAll (callback){
        db.query('SELECT city_name from cities', (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }

    static insert (city, callback) {
        db.query('INSERT INTO cities (city_name) VALUES ($1)', [city], (err, res) => {
            if (err.error)
                return callback(err);
            callback(res);
        });
    }
}

module.exports = Cities;