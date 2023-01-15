const { client, 
        getAllUsers,
        createUsers,
        updateUsers,
     } = require('./index');


async function createInitialUsers() {
    try {
        
        await createUsers({
                username: 'Jdizzle',
                password: 'jtdogson',
                name: 'Jake the Dog',
                location: '50th dead world'
                });
        await createUsers({
                username: 'Davey_J0hnson',
                password: 'adventuretime!',
                name: 'Finn the human',
                location: 'The Treehouse'
                });
        await createUsers({
                username: '010101',
                password: 'itsMOtime',
                name: 'BMO',
                location: '"Mo" Co.'
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
                password varchar(255) NOT NULL,
                name varchar(255) NOT NULL,
                location varchar(255) NOT NULL,
                active BOOLEAN DEFAULT TRUE
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
        console.log("Getting all users...", users);

        console.log("Updating users at [0]");
        const updatedUser = await updateUsers(users[0].id, {
            name: "Ice King",
            location: "Ice Kingdom"
        });
        console.log(updatedUser, "User at [0] updated!")

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

