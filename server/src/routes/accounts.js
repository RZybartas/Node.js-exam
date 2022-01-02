const { Router } = require('express');
const mysql = require('mysql2/promise');

const { dbConfig } = require('../../config');
const { isLoggedIn } = require('../middleware/authControllers');


const router = Router();
//Route to get account table
router.get('/', isLoggedIn, async (req, res) => {
    const user_id = req.token.id;
    
    try {
        const con = await mysql.createConnection(dbConfig);
        const [data] = await con.execute(`
        SELECT a.id, a.group_id, a.user_id, u.name
        FROM accounts a
        LEFT JOIN user_groups u
        On a.group_id = u.id
        WHERE a.user_id = ${mysql.escape(user_id)}
        `);
        await con.end();

        return res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: 'Not logged'})
    }
});
//Route to post into accounts
router.post('/', isLoggedIn, async (req,res) => {
    const user_id = req.token.id;
    const {group_id} = req.body;
    const name = group_id;
    if (!user_id || !group_id){
        return res.status(404).send({ error: 'Incorrect data'})
    }
    
    try {
        const con = await mysql.createConnection(dbConfig);
        await con.execute(`
        INSERT INTO user_groups (name)
        VALUES (${mysql.escape(name)})`);
        
        const [data] = await con.execute(`
        INSERT INTO accounts (user_id, group_id)
        VALUES (${mysql.escape(user_id)}, ${mysql.escape(group_id)})
        `);
        await con.end();

        return res.status(201).send(data)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: 'Not logged'})
    }
});

module.exports = router;