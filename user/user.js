var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db/db.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


let sql;

router.get('/signin', (req,res) => {
    res.render(path.join(__dirname, '../views/signin.pug') ,  {title: 'P2 Contacts'})  
});

router.get('/signup', (req,res) => {
    res.render(path.join(__dirname, '../views/signup.pug') ,  {title: 'P2 Contacts'})  
});

router.post('/signups', (req, res) => {
    const { firstName, lastName, username, password } = req.body;
  
    db.get('SELECT * FROM Users WHERE Username = ?', [username], (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Error retrieving user data from the database.');
      }
  
      if (user) {
        // User with the same username already exists
        return res.status(409).send('Username is already taken. Please choose a different username.');
      }
  
      bcrypt.hash(password, 10, (bcryptErr, hashedPassword) => {
        if (bcryptErr) {
          console.error(bcryptErr.message);
          return res.status(500).send('Error hashing password.');
        }
  
        const sql = 'INSERT INTO Users (FirstName, LastName, Username, Password) VALUES (?, ?, ?, ?)';
        const params = [firstName, lastName, username, hashedPassword];
  
        db.run(sql, params, function (insertErr) {
          if (insertErr) {
            console.error(insertErr.message);
            return res.status(500).send('Error inserting data into database.');
          }
  
          res.redirect('/');
        });
      });
    });
});
  

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    db.get('SELECT * FROM Users WHERE Username = ?', [username], (err, user) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Error retrieving user data from the database.');
      }
  
      if (!user) {
        // User not found
        return res.status(401).send('Invalid username or password.');
      }
  
      // Compare the provided password with the hashed password
      bcrypt.compare(password, user.Password, (bcryptErr, result) => {
        if (bcryptErr) {
          console.error(bcryptErr.message);
          return res.status(500).send('Error comparing passwords.');
        }
  
        if (result) {
            res.cookie('username', username);
            res.cookie('password', password);
          // Passwords match, user authenticated
          // Perform the desired action (e.g., redirect to dashboard, set session, etc.)
          res.redirect('/signin');
        } else {
          // Passwords do not match
          return res.status(401).send('Invalid username or password.');
        }
      });
    });
});

module.exports = router;
