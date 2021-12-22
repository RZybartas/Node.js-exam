const { Router } = require('express');
const joi = require('joi');
const { dbConfig } = require('../../config');
const { isLoggedIn } = require('../middleware/authControllers');

const router = Router();

const amountSchema = joi.object({
    amount: joi.number().required(),
    descriprion: joi.string().required(),
})
//Route to get bills specific group
router.get('/bills/:id', isLoggedIn, async (req,res) => {
    const id = req.params.group_id
    try {
        const con = await mysql.createConnection(dbConfig);
        const [bills] = await con.execute(`
        SELECT * FROM bills
        WHERE bills.group_id = ${mysql.escape(id)}
        `);
        await con.end();

        return res.status(201).send(bills)
    } catch (error) {
        console.log(error)
        res.status(404).send({ error: 'Not logged'})
    }
});
// Route to post bill for specific group
router.post('/bills', isLoggedIn, async (req, res) => {
    const billData = req.body;

    try {
        billData = await amountSchema.validateAsync(billData)
    } catch (error) {
        return res.status(404).send({ error: 'Incorrect bill data' })
    }

    try {
        const con = await mysql.createConnection(dbConfig);
        const [bills] = await con.execute(`
        INSERT INTO bills (group_id, amount, description)
        VALUES (
            ${mysql.escape(billData.group_id)}, 
            ${mysql.escape(billData.amount)},
            ${mysql.escape(billData.descriprion)}
            )
        `);
        await con.end();
        
        
        return res.status(201).send(bills)
    } catch (error) {
        
    }
});

module.exports = router;