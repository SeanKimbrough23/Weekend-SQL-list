const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

let tasks = [];

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "to-do";';
    console.log('Submitting Query to DB' , queryText);
    
    pool.query(queryText)
    .then ((result) => { 
        console.log("All my Result info:" , result);
        res.send(result.rows);
    })
    .catch((error) => {
        console.log(`Error making query ${queryText}`,error)
        res.sendStatus(500);
    });


});
router.post('/', (req, res) => {
    const newTask= req.body
    console.log('My new tasks', newTask);
    console.log(newTask);

    const queryText = `INSERT INTO "to-do" ("day","task","complete")
    VALUES ($1, $2, $3); 
    `; //need to start at $1 and go up to as many values as you have 

    pool.query(queryText, [newTask.day, newTask.tasks, newTask.complete])
    .then((result) => {
        res.sendStatus(201)
    })
    .catch((error) => {
        console.log(`Error making query ${queryText}`, error);
        res.sendStatus(500);
    })
   // tasks.push(req.body);
   //res.sendStatus(200);
});



















module.exports = router;