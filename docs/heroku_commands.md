"//" Comments
"" instructions
"->" Process
"<Ix>" Index "x"
"{Ix}" Reference to index "x"

//Heroku commands
    //Core heroku
        //Heroku workflow
            //Create git local repo -> Login to heroku -> create heroku-app -> add assets -> deploy app (push to heroku git)

    <I1>//Login to heroku
        heroku login
        //enter email and password

    <I2>//Create app and heroku git remote repositary (associated with the local one)
        heroku create eh-weather-app

    <I3>//Add assets
        heroku addons:create heroku-postgresql:hobby-dev --name=weather-db --app=eh-weather-app

        heroku addons:attach weather-db --app=eh-weather-app

    <I4>//Deploy the app
        //add all needed files to the local repo and commit them
        //Then push to heroku-git-remote-repositary
            git push heroku master
        //Run the app (the dyno)
            heroku ps:scale web=1
        //Visit generated url
            heroku open

    <I>//Test locally
        heroku local
    <I>//Remove connected heroku-git-remote-repositary from local and remote origin repo's
       git remote rm -a git remote rm https://git.heroku.com/guarded-fjord-34473.git
    <I>//Check remote repo's
       git remote -v
    <I>//Change the connected heroku-git-remote-repositary
       heroku git:remote -a eh-weather-app

    <I>//Dealing with postgres
        //Attach addon with <I3>
        //Get into postgres command line (got to setup path for psql: C:\Program Files\PostgreSQL\10\bin)
        heroku pg:psql --app eh-weather-app
        //Run psql commands (use ; to end a command, or \q to close the psql console)
        CREATE TABLE cities (
        id serial NOT NULL,
        city_name character varying(50) NOT NULL,
        PRIMARY KEY (id)
        );
