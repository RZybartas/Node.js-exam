const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors')
const {port, dbConfig} = require('./config')


const auth = require('./src/routes/auth');

const main = async () => {
    const app = express();
    
    try {
        const con = await mysql.createConnection(dbConfig);

        const createTableUsers = `
            CREATE TABLE IF NOT EXISTS users (
            id INTEGER AUTO_INCREMENT NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password TEXT NOT NULL,
            reg_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE (email)
        )
        `;

        const createTableGroups = `
            CREATE TABLE IF NOT EXISTS usergroups (
            id INTEGER AUTO_INCREMENT NOT NULL,
            name VARCHAR(50) NOT NULL,
            PRIMARY KEY (id)
        )
        `;

        const createTableBills = `
            CREATE TABLE IF NOT EXISTS bills (
            id INTEGER AUTO_INCREMENT NOT NULL,
            group_id INTEGER,
            amount DECIMAL(5, 2) NOT NULL,
            description TEXT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (group_id) REFERENCES usergroups (id)
        )
        `;
        const createTableAccounts = `
            CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER AUTO_INCREMENT NOT NULL,
            group_id INTEGER,
            user_id INTEGER,
            PRIMARY KEY (id),
            FOREIGN KEY (group_id) REFERENCES usergroups (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        `;
        await con.query(createTableUsers);
        await con.query(createTableGroups);
        await con.query(createTableBills);
        await con.query(createTableAccounts);

        app.use(express.json());
        app.use(cors());
    
        app.mysql = con;
        
        app.use('/', auth);

        app.get('*', (req, res) => {
            res.status(404).send({ error: 'Page not found'})
        });
        
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`)
        })
        
    } catch (error) {
        console.log(error, "Something wrong with database")
    }

    
}

main();