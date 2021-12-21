const express = require('express');
const cors = require('cors');


const {port} = require('./config')
const getConnection = require('./src/database/mysql');
const User = require('./src/models/users');
const Groups = require('./src/models/groups');
const Bills = require('./src/models/bills');
const Accounts = require('./src/models/accounts');

const main = async () => {
    
    await User.init();
    await Groups.init();
    await Bills.init();
    await Accounts.init();

    const app = express();
    app.use(express.json());
    app.use(cors());

    app.mysql = getConnection();
    
    app.get('/', (req, res) => {
        res.send('ok')
    })
    
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`)
    })
    
}

main();