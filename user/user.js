var express = require('express');
var router = express.Router();
var path = require('path');
var db = require('../db/db.js');
let sql;

router.get('/signin', (req,res) => {
    res.render(path.join(__dirname, '../views/signin.pug') ,  {title: 'P2 Contacts'})  
});

router.get('/signup', (req,res) => {
    res.render(path.join(__dirname, '../views/signup.pug') ,  {title: 'P2 Contacts'})  
});

module.exports = router;
