const { Router } = require('express');
const mysql = require('mysql2/promise');

const { dbConfig } = require('../../config');
const { isLoggedIn } = require('../middleware/authControllers');


const router = Router();
//Route to get account table
router.get('/accounts', isLoggedIn, async (req, res) => {
    const user_id = req.token;

    try {
        const con = await mysql.createConnection(dbConfig);
        const [data] = await con.execute(`
        SELECT a.id, a.group_id, a.user_id
        FROM accounts a
        INNER JOIN usergroups u
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
router.post('/accounts', isLoggedIn, async (req,res) => {
    if (!req.body.group_id || !req.token){
        return res.status(404).send({ error: 'Incorrect data'})
    }

    try {
        const user_id = req.token.id;
        const group_id = req.body.usergroup_id;
        const con = await mysql.createConnection(dbConfig);
        
        const [data] = await con.execute(`
        INSERT INTO accounts (user_id, group_id)
        VALUES (${mysql.escape(user_id)}, ${mysql.escape(group_id)})
        `);

        await con.end();

        return res.status(201).send(data)
    } catch (error) {
        
    }
});

module.exports = router;