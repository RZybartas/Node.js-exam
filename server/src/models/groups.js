const getConnection = require('../database/mysql');

module.exports =  class Groups {
    constructor({id, name}) {
        this.id = id,
        this.name = name
    };

    static async init() {
        try {
            const connection = await getConnection();
            const query = `
                CREATE TABLE IF NOT EXISTS usergroups (
                    id INTEGER AUTO_INCREMENT NOT NULL,
                    name VARCHAR(50) NOT NULL,
                    PRIMARY KEY (id)
                )
            `;

            await connection.query(query);
            console.log('Table groups created');

        } catch (error) {
            console.log("Could't init groupsDB");
        }
    }
};