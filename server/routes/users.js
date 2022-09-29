const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../models/User");


//http://localhost:8000/api/users

/*
    ROUTE: POST api/users
    DESC: Register a user
    ACCESS: Public
*/
router.post('/', [
    check('name', 'Please enter your name').notEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('email', 'Please use a UofT email').custom(value => {
        return value.includes("@mail.utoronto.ca");
    }),
    check('password', 'Please enter a password with 5 or more characters').isLength({min: 5})
], (request, response) => { 
    const errors = validationResult(request);
    if(!errors.isEmpty()) return response.status(400).json({errors: errors.array()});
    response.send("huzzah");
}); 

module.exports = router;
