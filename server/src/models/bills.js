const getConnection = require('../database/mysql');

module.exports =  class Bills {
    constructor({id, group_id, amount, description}) {
        this.id = id,
        this.group_id = group_id,
        this.amount = amount,
        this.description = description
    };

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
            CREATE TABLE IF NOT EXISTS bills (
                id INTEGER AUTO_INCREMENT NOT NULL,
                group_id INTEGER,
                amount DECIMAL(5, 2) NOT NULL,
                description TEXT NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (group_id) REFERENCES usergroups (id)
            )
            `;

            await connection.query(query);
            console.log('Table bills created');

            
        } catch (error) {
            console.log("Could't init billsDB");
        }
    }
};