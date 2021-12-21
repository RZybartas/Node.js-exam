const getConnection = require('../database/mysql');

module.exports =  class User {
    constructor({id, full_name, email, password, reg_timestamp}) {
        this.id = id,
        this.full_name = full_name,
        this.email = email,
        this.password = password,
        this.reg_timestamp = reg_timestamp
    };

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    full_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(20) NOT NULL,
                    reg_timstamp TIMESTAMP,
                    PRIMARY KEY (id),
                    UNIQUE (email)
                )
            `;

            await connection.query(query);
            console.log('Table users created');

            
        } catch (error) {
            console.log("Could't init userDB");
        }
    }
};