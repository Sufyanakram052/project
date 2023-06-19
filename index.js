const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

//Tables
const createTablesIfNotExists = require('./tables/tables.js')

// Parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to use Pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middleware
const customMiddleware = (req, res, next) => {
    // Perform some middleware logic here
    console.log('Custom middleware executed');
    next(); // Call next() to pass control to the next middleware or route handler
};
// Middleware
app.use(customMiddleware);

app.use(require('./contacts/contact.js'));
app.use(require('./user/user.js'));


//Database Path
const db = require('./db/db.js')

db.serialize(() => {
    console.log('Connected to the first SQLite database.');
});


//Tables
app.use(createTablesIfNotExists);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
