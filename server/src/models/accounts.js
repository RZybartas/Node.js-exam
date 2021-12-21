const getConnection = require('../database/mysql');

module.exports =  class Accounts {
    constructor({id, group_id, user_id}) {
        this.id = id,
        this.group_id = group_id,
        this.user_id = user_id
    };

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
            CREATE TABLE IF NOT EXISTS accounts (
                id INTEGER AUTO_INCREMENT NOT NULL,
                group_id INTEGER,
                user_id INTEGER,
                PRIMARY KEY (id),
                FOREIGN KEY (group_id) REFERENCES usergroups (id),
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
            `;

            await connection.query(query);
            console.log('Table accounts created');

            
        } catch (error) {
            console.log("Could't init accountsDB");
        }
    }
};