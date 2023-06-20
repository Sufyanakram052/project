var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db/db.js');
let sql;


// All Contacts
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Contacts';
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.render(path.join(__dirname, '../views/index.pug') ,  {title: 'P2 Contacts', rows})
    });
});

// Create Route
router.get('/create', (req,res) => {
  res.render(path.join(__dirname, '../views/createconteact.pug') ,  {title: 'P2 Contacts'})
});

//Contact Info
router.get('/:id', (req, res) => {
  const formData = req.params.id;
  const sql = `SELECT * FROM Contacts where id = ${formData}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.render(path.join(__dirname, '../views/contactinfo.pug') ,  {title: 'P2 Contacts', rows})
  });
});

//Contact Info
router.get('/:id/edit', (req, res) => {
  const formData = req.params.id;
  const sql = `SELECT * FROM Contacts where id = ${formData}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.render(path.join(__dirname, '../views/updatecontact.pug') ,  {title: 'P2 Contacts', rows})
  });
});


//Create
router.post('/creates', (req, res) => {
    const formData = req.body;

      db.run(`INSERT INTO Contacts (
                  FirstName,
                  LastName,
                  PhoneNumber,
                  EmailAddress,
                  Street,
                  City,
                  State,
                  Zip,
                  Country,
                  Contact_By_Email,
                  Contact_By_Phone
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `, 
      [
        formData.firstName,
        formData.lastName,
        formData.phoneNumber,
        formData.emailAddress,
        formData.street,
        formData.city,
        formData.state,
        formData.zip,
        formData.country,
        formData.contactByEmail ? 1 : 0,
        formData.contactByPhone? 1 : 0
      ],function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).send('Error inserting data into database.');
          } else {
            res.redirect('/');
          }
      });
    
});

//Update
router.post('/edit', (req, res) => {
  const contactId = parseInt(req.body.ID);
  const formData = req.body;

  db.run(
    `UPDATE Contacts SET
      FirstName = ?,
      LastName = ?,
      PhoneNumber = ?,
      EmailAddress = ?,
      Street = ?,
      City = ?,
      State = ?,
      Zip = ?,
      Country = ?,
      Contact_By_Email = ?,
      Contact_By_Phone = ?
    WHERE ID = ?`,
    [
      formData.firstName,
      formData.lastName,
      formData.phoneNumber,
      formData.emailAddress,
      formData.street,
      formData.city,
      formData.state,
      formData.zip,
      formData.country,
      formData.contactByEmail ? 1 : 0,
      formData.contactByPhone ? 1 : 0,
      contactId
    ],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Error updating data in the database.');
      } else {
        res.redirect('/');
      }
    }
  );
});

//Delete
router.get('/:id/delete', (req, res) => {
  const contactId = req.params.id;
  const sql = `DELETE FROM Contacts WHERE ID = ?`;
  
  db.run(sql, [contactId], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error deleting data from the database.');
    } else {
      res.redirect('/');
    }
  });
});
router.get('/delete', (req, res) => {
  const contactId = req.params.id;
  const sql = `DELETE FROM Contacts WHERE ID = ?`;
  
  db.run(sql, [contactId], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error deleting data from the database.');
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;