const express = require('express'); 
const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { dbConfig, jwtSecret } = require('../../config');

const router = express.Router();



const userSchema = joi.object({
    full_name: joi.string().required,
    email: joi.string().email().lowercase().required(),
    password: joi.string().min(8).required(),
});
//route for sign up
router.post('/register', async (req, res) => {
    let userData = req.body;
    
    
    try {
        userData = await userSchema.validateAsync(userData)
        console.log(userData)
        } catch (error) {
                return res.status(404).send({ error: 'Incorrect data' })
            }
            
        try {
            const hashPw = bcrypt.hashSync(userData.password);
            
            const con = await mysql.createConnection(dbConfig)
            const [data] = await con.execute(`
                INSERT INTO users (full_name, email, password)
                VALUES (
                ${mysql.escape(userData.full_name)},
                ${mysql.escape(userData.email)},
                '${hashPw}')
            `);
            await con.end();
            
            return res.send(data)
        } catch (error) {
            return res.status(500).send({ error: 'Please try again !' })
        }
        });
        
        router.post('/login', async (req, res) => {
            let userData = req.body;
            const { mysql } = req.app;
            
            try {
                userData = await userSchema.validateAsync(userData);
            } catch (error) {
                return res.status(404).send({ error: 'Incorrect email or password' })
            };
            
            try {
                const query = `SELECT * FROM users
                WHERE email = ${mysql.escape(userData.email)}`;
                
                const [data] = await mysql.query(query)
                
                if (data.length === 0) {
                    return res.status(404).send({ error: 'Incorrect email or password'})
                }
                //Checking password if exists
                const isAuthed = bcrypt.compareSync(userData.password, data[0].password);
                
                if (isAuthed) {
                    const token = jwt.sign({ id: data[0].id, email: data[0].email}, jwtSecret);
                    
                    return res.send({ msg: 'Succesfully logged', token}) 
                };
        
        return res.status(400).send({ error: 'Incorrect email or password'});
    } catch (error) {
        return res.status(500).send({ error: 'Please try again'})
    }
});

module.exports = router;