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
router.get('/contactinfo', (req, res) => {
  // const formData = req.params.id;
  // const sql = `SELECT * FROM Contacts where id = ${id}`;
  // db.all(sql, [], (err, rows) => {
  //   if (err) {
  //     return res.status(500).json({ message: err.message });
  //   }
  //   res.render(path.join(__dirname, '../views/contactinfo.pug') ,  {title: 'P2 Contacts', rows})
  // });
  res.render(path.join(__dirname, '../views/contactinfo.pug') ,  {title: 'P2 Contacts'})

});

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
        formData.contactByEmail,
        formData.contactByPhone
      ],function (err) {
          if (err) {
            console.error(err.message);
            res.status(500).send('Error inserting data into database.');
          } else {
            const sql = 'SELECT * FROM Contacts';
            db.all(sql, [], (err, rows) => {
              if (err) {
                return res.status(500).json({ message: err.message });
              }
              res.render(path.join(__dirname, '../views/index.pug') ,  {title: 'P2 Contacts', rows})
            });
          }
      });
    
});


module.exports = router;

// const createContact = (contact) => {
//     return new Promise((resolve, reject) => {
//       const sql = `
//         INSERT INTO Contacts (
//           FirstName,
//           LastName,
//           PhoneNumber,
//           EmailAddress,
//           Street,
//           City,
//           State,
//           Zip,
//           Country,
//           Contact_By_Email,
//           Contact_By_Phone
//         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//       `;
//       const values = [
//         contact.firstName,
//         contact.lastName,
//         contact.phoneNumber,
//         contact.emailAddress,
//         contact.street,
//         contact.city,
//         contact.state,
//         contact.zip,
//         contact.country,
//         contact.contactByEmail,
//         contact.contactByPhone
//       ];
  
//       db.run(sql, values, function (err) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(this.lastID);
//         }
//       });
//     });
//   };