const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

let tasks = [];

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "to-do";';
    console.log('Submitting Query to DB' , queryText);
    
    pool.query(queryText)
    .then ((result) => { 
        console.log("All my REsult info:" , result);
        res.send(result.rows);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`,err)
        res.sendStatus(500);
    });


});



















module.exports = router;