# about
the goal of this app is to create a app with a react frontend, backend server with a relational database, then deploy it on heroku
## layout
- root dir, cotains main package.json with commands to run the server and client
- client folder: holds package.json with react commands and dependancies, contains frontend dir bootstraped via create-react-app
- server folder: holds backend code
    - api: express defined routes
    - database: config psql (posgresql), setup connection pool to psql server, template for queries
    - models: called by the api, uses database template to send sql queries to posgreSQL
    - caries out operations to data retrieved from or about to be send to the posgreSQL server
    - index.js: setup and config express server
    
# setup
## server
    mkdir server
    //create package.json
    npm init
    //grab packages for server
    npm install body-parser cookie-parser express pg hash.js uuid request request-promise --save
    npm install concurrently nodemon --save-dev
## client
    npx create-react-app client
    cd client
    npm install react-bootstrap react-router react-router-bootstrap react-router-dom react-big-calendar react-day-picker moment

## Initial git setup
    //Created online git repo
    //Added node to .gitignore
    git init
    git remote add origin https://github.com/Ethan1745/weather_app
    echo node_modules > .gitignore
    git add .
    git commit -m "initial commit"
    git push origin master -f

## running cmds 
//manually run server
    node src/server/index.js
//package.json scripts
    "server": "nodemon server"
    "dev": "concurrently \"npm run server\" \"npm run start\""
npm run dev

# external psql pre-setup
pgAdmin gui tool
add psql to path
    C:\Program Files\PostgreSQL\10\bin
