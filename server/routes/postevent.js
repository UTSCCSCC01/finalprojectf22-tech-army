const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const mongoose = require('mongoose');
const auth = require("../middleware/auth");


//=================================
//             Event API
//=================================
//save data to the db


// Event page API


router.get("/events_by_id", auth, (req, res) => {
    let type = req.query.type
    let eventIds = req.query.id

    if (type === "array") {

    }


    //we need to find the product information that belong to product Id 
    Event.find({ '_id': { $in: eventIds } })
        .populate('writer')
        .exec((err, event) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(event)
        })
});




module.exports = router;
