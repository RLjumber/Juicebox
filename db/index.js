const { Client } = require('pg');

const client = new Client('postgresql://localhost/mydb?user=other&password=secret');

async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username FROM users;`
    );

    return rows;
}


module.exports = {
    client,
    getAllUsers,
};