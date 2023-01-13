const { Client } = require('pg');

const client = new Client({
    host: "localhost", 
    port: 5432,
    // password: "password",
    database: "juicebox-dev",
    // user: "mortyrogers",
});

// const client = new Client("postgres://mortyrogers:@localhost:5432/juicebox-dev");

// const client = new Client(`postgres://localhost:5432/juicebox-dev`);

async function createUser({username, password}) {
    try {
        const result = await client.query(`
            INSERT INTO users (username, password) 
            VALUES ($1, $2);
            `, [ username, password ]);

    } catch (error) {
        console.error("Error creating user!", error)
        throw error;
    }
}

async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username, password FROM users;`
    );

    return rows;
};


module.exports = {
    client,
    getAllUsers,
    createUser,
};