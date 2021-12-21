const mysql = require('mysql2/promise');
require('dotenv').config();

const { dbConfig } = require('../../config');

module.exports = getConnection = async () => 
    mysql.createConnection(dbConfig);