//pg is the postgres client, interface used to interact with the postgres server items
var { Pool } = require('pg');

//If process passes a database string then use it, otherwise use localhost
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:66004bb0@localhost:5432/weather-db';
//Figure out if in a development environment or a production environment.
const SSL = process.env.NODE_ENV === 'production';

class Database{
    //Called as soon as object is made
    constructor (){
        //Create pool and pass connection string and ssl
        this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: SSL
        });
        //Catch errors
        this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
        });

    }

    query (query, ...args){
        //Connect, within connection calls query method on the client
        this._pool.connect((err, client, done) => {
            if (err) throw err;
            const params = args.length === 2 ? args[0] : [];
            const callback = args.length === 1 ? args[0] : args[1];

            client.query(query, params, (err, res) => {
                done();
                if (err) {
                    console.log(err.stack);
                    return callback({ error: 'Database error.' }, null);
                }
                callback({}, res.rows);
            });
        });

    }

    end (){
        this._pool.end();
    }
}

//Creating a new database object
module.exports = new Database();