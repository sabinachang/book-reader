var express = require('express');

module.exports = express
.Router()
.get('/users', function(req, res, next) {
     res.json([{
       id: 1,
       name: "User1",
       password: 'pwd123'
     }, {
       id: 2,
       name: "User 2",
       password: 'pwd123'
     }]);
});