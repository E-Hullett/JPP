const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//Import own code (so include path)
var db = require('./database');


//process.env represents the state of the system environment your application is in when it starts
const ENV = process.env.NODE_ENV;
//If not given a port use 5000
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

//When we call HTTP Get on api endpoint (IpAddress/api/cities), then cities are retrieved.
app.use('/api/cities', require('./api/cities'));
app.use('/api/weather', require('./api/weather'));

//When in production for the app, serve static files through express
if (ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
});


db.query('SELECT NOW()', (err, res) => {
    if (err.error)
        return console.log(err.error);
    //Select first row of selected rows and take the now column
    console.log(`PostgreSQL connected: ${res[0].now}.`);
});

module.exports = app;


//Test with no react via: http://localhost:5000/api/cities
//root -> api-endpoint reached via url -> uses model which gets data