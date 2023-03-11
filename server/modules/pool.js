const pg = require('pg') // imports pg into our route, always goes with the routes 

//Pool contains an object that has details about our database
const pool = new pg.Pool({
    database: 'weekend-to-do-app', // this is in the database name in POSTICO
    host: 'Localhost',
    port: 5432
});

module.exports = pool; // this is telling computer to export it so we can use the SQL database in other files


// took this from router.js so it can be used more than once and we dont have to rewrite it.