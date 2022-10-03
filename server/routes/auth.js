const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require("../models/User");
const jsonwebtoken = require('jsonwebtoken');
const constants = require('../config/constants.json');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

//http://localhost:8000/api/auth

/*
    ROUTE: GET api/auth
    DESC: Get logged in user
    ACCESS: Private (getting user thats logged in so it should be private)
*/
router.get('/', auth, async (request, response) => { // note: it is just a slash since we defined the route already in server.js
    try{
        //request.user is assigned in the middleware (auth) 
        const user = await User.findById(request.user.id).select('-password');
        response.json(user);
    }catch (error) {
        console.log(error.message);
        response.status(500); 
    }
}); 

/*
    ROUTE: POST api/auth
    DESC: Authenticate and get token (so that we can access private routes)
    ACCESS: Public 
*/
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('email', 'Please use a UofT email').custom(value => {
        return value.includes("@mail.utoronto.ca");
    }),
    check('password', 'Please enter a password with 5 or more characters').isLength({min: 5})
], async (request, response) => { 
    const errorMessages = validationResult(request);
    if(!errorMessages.isEmpty()) return response.status(400).json({errors: errorMessages.array()});
    const { email, password } = request.body;
    try{
        let user = await User.findOne({email});
        const errMsg = {message: 'User credentials is invalid'};
        if(!user) return response.status(400).json(errMsg);
        const passwordMatches = await bcrypt.compare(password, user.password); //compares password to encrypted password
        if(!passwordMatches) return response.sendStatus(400).json(errMsg);
        jsonwebtoken.sign(
            {user: { id: user.id}}, //user id is auto generated by mongoose
            constants.jsonwebtokenSecret, {
            expiresIn: 7200 //2 hours
        }, (error, token) => {
            console.log('test');
            if(error) throw error;
            response.json({token});
        });
    }catch(err){
        console.log(err.message);
        response.status(500); //server error
    }
}); 

module.exports = router;
