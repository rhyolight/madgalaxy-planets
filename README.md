MadGalaxy Planets
===========

This is the source code for all planet sites

To run this on your own machine*:

__1. Create an Enviornment variable (to specify what planet site you would like to build)__

    ***These are all possible env variable values***

    PLANETNAME="planet-angular"
    PLANETNAME="planet-backbone"
    PLANETNAME="planet-ember"
    PLANETNAME="planet-jquery"
    PLANETNAME="planet-node"


__2. Install Dependencies__
(assuming you've already installed Node.js and elasticsearch)

    npm install

__3. Start the database dameon__

    cd planet-angular
    mkdir data
    mongod --dbpath data

__4. Start the databse *IN NEW TAB*__

    mongo

__5. Run the server *IN ANOTHER NEW TAB*__

    npm start


Enjoy!
-- [MadGlory](http://madglory.com)