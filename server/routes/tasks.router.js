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
// DELETE song from database using ID
router.delete('/:id', (req, res)=> {
    console.log('Inside of tasks/:id, DELETE request');
    const idToDelete = [req.params.id];
    console.log('id to delete', idToDelete);
    const queryText = `DELETE FROM "to-do" WHERE id=$1`

    pool.query(queryText, [Number(idToDelete)])// has to be in an array everytime 
    .then ((results) => {
        console.log('Successful Deletion for task id:', idToDelete);
        res.sendStatus(200);
    })
    .catch ((error) => {
        console.log(`Error making query: ${queryText}` , error);
        res.sendStatus(500)
    })
})

//UPDATE  for a tasks to make it 1 using ID
router.put('/:id', (req, res) => {
    console.log('Tasks to update rank by id:' , idToPut);

    const idToPut = [req.params.id];
    const queryText = `UPDATE tasks SET "id" = 1
    WHERE id = $1`

    pool.query(queryText, [idToPut])
    .then ((results) => {
        console.log('update successful for idToPut:' , idToPut);
        res.sendStatus(200); 
    }) .catch((error) => {
        console.log('Error making update to tasks for idToPut:', idToPut);
        console.log("update queryText:", queryText);
        res.sendStatus(500);
    })
     
})



module.exports = router;