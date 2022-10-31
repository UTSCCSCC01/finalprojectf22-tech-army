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
router.post("/uploadEvent", auth, (req, res) => {
    const userId = req.user.id;
    const user = Event.findById(userId);
    const userIdObj = new mongoose.mongo.ObjectId(userId);
    req.body.creator = userIdObj;
    const event = new Event(req.body);
    event.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
    })
    user.eventsPosted.push(event._id);
    user.save();
    res.status(200).json({message: "Event has been posted"});
});


// Event page API
router.post("/getEvents", auth, (req, res) => {

    Event.find()
    .exec( (err, events) => {
        if (err) return res.status(400).json({success:false,err})

        res.status(200).json({success:true , events})
    } )

});


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
