const { Router } = require('express');
const { isLoggedIn } = require('../middleware/authControllers');
const mysql = require('mysql2/promise');

const { dbConfig } = require('../../config');

const router = Router();


//Route to get bills specific group
router.get('/:id', isLoggedIn, async (req,res) => {
    try {
        
        const con = await mysql.createConnection(dbConfig);
        const [bills] = await con.execute(`
        SELECT * FROM bills
        WHERE group_id = ${req.params.id}
        `);
        await con.end();

        return res.status(201).send(bills)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: 'Not logged'})
    }
});
// Route to post bill for specific group
router.post('/', isLoggedIn, async (req, res) => {
    const billData = req.body;

    try {
        const con = await mysql.createConnection(dbConfig);
        const [bills] = await con.execute(`
        INSERT INTO bills (group_id, amount, description)
        VALUES (
            ${billData.group_id}, 
            ${billData.amount},
            '${billData.description}'
            )
        `);
        await con.end();
        
        
        return res.status(201).send(bills)
    } catch (error) {
        console.log(error);
        res.status(404).send({ error: 'Incorrect data'})
    }
});

module.exports = router;