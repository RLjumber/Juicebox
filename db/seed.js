const { client, 
        getAllUsers,
        createUser,
     } = require('./index');


async function createInitialUsers() {
    try {
        
        await createUser({
                username: 'Jake the dog',
                password: 'jtdogson'
                });
        await createUser({
                username: 'Finn the human',
                password: 'adventuretime!'
                });
        await createUser({
                username: 'BMO',
                password: 'itsMOtime'
                });        


        // console.log(albert);
    } catch(error) {
        console.error("Error creating users!", error);
        throw error;
        }
};

async function dropTables() {
    try {
        console.log("dropping tables...");

        await client.query(`DROP TABLE IF EXISTS users;`);

        console.log("tables dropped!");
    } catch(error) {
        console.error("Oops! Ran into an error dropping the tables!", error);
        throw error;
    }
};

async function createTables() {
    try {
        console.log("building tables...");

        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
                );
            `);

            console.log("tables built!");
    } catch(error) {
        console.error("Couldn't build the tables!", error);
        throw error;
    }
};

async function  testDB() {
    try {
        console.log("testing database...")

        const users = await getAllUsers();
        console.log("getAllUsers: ", users);

        console.log("database tested!");
    } catch (error) {
        console.log("Error, databases not tested successfully!", error);
        console.error(error);
    }
};

async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
    }
  }

rebuildDB()
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());

