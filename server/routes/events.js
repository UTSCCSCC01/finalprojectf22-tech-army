const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { events } = require('../models/Event');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

// @route   POST api/events
// @desc    Create an event for the user that is logged in
// @access  Private
router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
], auth,  async (req, res) => {
    //check for errors in the request
    const errors = validationResult(req);
    // if there are errors, return a 400 status and the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        //create a new event 
        const newEvent = new Event({
            title: req.body.title,
            description: req.body.description,
        });
        //save the event to the database
        const event = await newEvent.save();
        //send the event back to the client
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events
// @desc    Get all events
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        //find all events without any filters
        const events = await Event.find();
        //send the events back to the client
        res.json(events);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events/array
// @desc    Get an array of events that a user has posted or joined
// @access  Private
router.get('/array', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const eventsJoinedIds = user.eventsJoined;
        const eventsPostedIds = user.eventsPosted;
        const eventJoinedObjects = await Event.find({ '_id': { $in: eventsJoinedIds } });
        const eventPostedObjects = await Event.find({ '_id': { $in: eventsPostedIds } });
        res.status(200).json({eventsJoined: eventJoinedObjects, eventPosted : eventPostedObjects});
    } catch (err) {
        console.log(err);  
        res.status(500).send('Server Error');
    }
});

// @route   GET api/events/:id
// @desc    get an event by its id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        //if there is no event, send a 404 status
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
    
        res.json(event);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/events/:id
// @desc    Add user to an event
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newUserId = new mongoose.mongo.ObjectId(userId);
        const newEventId = new mongoose.mongo.ObjectId(req.params.id);
        const usersJoined = event.usersJoined;
        if(usersJoined.some((user) => {
            return user.toString() == userId;
        })){
            return res.status(400).json({ message: 'User is already in event' });
        }

        usersJoined.push(newUserId); //add user to an event
        user.eventsJoined.push(newEventId); //add an event to a user
        await event.save();
        await user.save();
        res.status(200).json({message: "User has been added to event"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        //find the event by the id
        const event = await Event.findById(req.params.id);
        //if there is no event, send a 404 status
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        //remove the event
        await event.remove();
        //send a message back to the client
        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }

        res.status(500).send('Server Error');
    }
});


module.exports = router;
