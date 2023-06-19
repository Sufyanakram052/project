const db = require('../db/db.js');

const checkContactsTable = () => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Contacts'",
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

// Function to check if the Users table exists
const checkUsersTable = () => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Users'",
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

// Create the Contacts and Users tables if they don't exist
const createTablesIfNotExists = async () => {
    try {
        const contactsTable = await checkContactsTable();
        const usersTable = await checkUsersTable();

        if (!contactsTable) {
            db.run(`
          CREATE TABLE Contacts (
            ID INTEGER PRIMARY KEY,
            FirstName TEXT,
            LastName TEXT,
            PhoneNumber TEXT,
            EmailAddress TEXT,
            Street TEXT,
            City TEXT,
            State TEXT,
            Zip TEXT,
            Country TEXT,
            Contact_By_Email Boolean,
            Contact_By_Phone Boolean
          )
        `);
            console.log('Contacts table created');
        }

        if (!usersTable) {
            db.run(`
          CREATE TABLE Users (
            ID INTEGER PRIMARY KEY,
            FirstName TEXT,
            LastName TEXT,
            Username TEXT,
            Password TEXT
          )
        `);
            console.log('Users table created');
        }
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

// Call the function to create tables if they don't exist
createTablesIfNotExists();
module.exports = createTablesIfNotExists;