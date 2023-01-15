const { Client } = require('pg');

const client = new Client({
    host: "localhost", 
    port: 5432,
    // password: "password",
    database: "juicebox-dev",
    // user: "mortyrogers",
});



async function createUsers({
        username, 
        password, 
        name, 
        location
    }) {

    try {
        const { rows: [user] } = await client.query(`
            INSERT INTO users (username, password, name, location) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [ username, password, name, location]);

            console.log("Users created!")
            return user;
    } catch (error) {
        console.error("Error creating user!", error)
        throw error;
    }
};

async function updateUsers( id, fields={} ) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));

        return user;
    } catch (e) {
        throw e;
    }
}

async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username, password, name, location FROM users;`
    );

    return rows;
};


module.exports = {
    client,
    getAllUsers,
    createUsers,
    updateUsers
};