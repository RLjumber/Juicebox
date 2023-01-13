const { client, getAllUsers } = require('./index');

async function  testDB() {
    try {
        client.connect();

        const users = await getAllUsers();

        console.log(users);
    } catch (error) {
        console.log("error!", error);
        console.error(error);
    } finally {
        client.end();
    }
};

testDB();