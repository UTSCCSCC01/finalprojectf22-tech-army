const express = require('express');
 const router = express.Router();
 const { check, validationResult } = require('express-validator');
 const auth = require('../middleware/auth');
 const Event = require('../models/Events');
 const User = require('../models/User');

 // @route   POST api/events
 // @desc    Create an event for the user that is logged in
 // @access  Private
 router.post('/', [auth, [
     check('title', 'Title is required').not().isEmpty(),
     check('description', 'Description is required').not().isEmpty(),
     check('date', 'Date is required').not().isEmpty()
 ]], async (req, res) => {
     //check for errors in the request
     const errors = validationResult(req);
     // if there are errors, return a 400 status and the errors
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     try {
         const user = await User.findById(req.user.id).select('-password');
         //create a new event 
         const newEvent = new Event({
             title: req.body.title,
             description: req.body.description,
             date: req.body.date,
             creator: req.user.id
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
         //find all events and sort by date
         const events = await Event.find().sort({ date: -1 });
         //send the events back to the client
         res.json(events);
     } catch (err) {
         console.error(err.message);
         //if there is an error, send a 500 status
         res.status(500).send('Server Error');
     }
 });

 //get all events for a specific user by their id
 // @route   GET api/events/:id
 // @desc    get all events for a specific user by their ID
 // @access  Private
 router.get('/:id', auth, async (req, res) => {
     try {
         //find all events for a specific user by their id
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

 // @route   DELETE api/events/:id
 // @desc    Delete an event
 // @access  Private
 router.delete('/:id', auth, async (req, res) => {
     try {
         const event = await Event.findById(req.params.id);

         if (!event) {
             return res.status(404).json({ msg: 'Event not found' });
         }

         // Check user
         if (event.creator.toString() !== req.user.id) {
             return res.status(401).json({ msg: 'User not authorized' });
         }

         await event.remove();

         res.json({ msg: 'Event removed' });
     } catch (err) {
         console.error(err.message);

         if (err.kind === 'ObjectId') {
             return res.status(404).json({ msg: 'Event not found' });
         }

         res.status(500).send('Server Error');
     }
 });

 module.exports = router;