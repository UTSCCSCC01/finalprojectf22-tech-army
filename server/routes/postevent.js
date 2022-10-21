const express = require('express');
const router = express.Router();

const Event = require("../models/Event");

const auth = require("../middleware/auth");


//=================================
//             Event API
//=================================
//save data to the db
router.post("/uploadEvent", auth, (req, res) => {

    const event = new Event(req.body)

    event.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

module.exports = router;