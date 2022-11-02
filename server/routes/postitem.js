const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
const item = require('../models/item');
const User = require('../models/User');


//http://localhost:8000/api/postitems
// Note: uid = user id, iid = item id

/*
    ROUTE: POST api/postitem/uploadItem
    DESC: POST items (UTSC marketplace)
    ACCESS: Private 
*/
router.post("/uploadItem", auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
], async (req, res) => {
    //check for errors in the request
    const errors = validationResult(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions and returns a 400 status
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const items = new item({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            date_added: req.body.date_added,
            seller: user
        });

        items.save();
        return res.status(200).json({ success: true })
        
    } catch (error) {
        return res.status(400).json({ success: false, err })
    }
});

// @route   GET api/postitems
// @desc    Get all Items
// @access  Private
router.get('/', async (req, res) => {
    try {
        //find all items without any filters
        const items = await item.find();
        //send the items back to the client
        res.json(items);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        res.status(500).send('Server Error');
    }
});

// @route   GET api/items/array
// @desc    Get an array of items that the user has bookmarked
// @access  Private
router.get('/array', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const itemsBookmarked = user.itemsBookmarked;
        const itemsBookmarkedObjs = await item.find({ '_id': { $in: itemsBookmarked } });
        res.status(200).json({itemsBookmarked: itemsBookmarkedObjs});
    } catch (err) {
        console.log(err);  
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/postitem/:id
// @desc    bookmark an item
// @access  Private
router.put('/:id', auth, async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newItemId = new mongoose.mongo.ObjectId(itemId);
        const itemsBookmarked = user.itemsBookmarked;
        const message = "";
        if(itemsBookmarked.some((item) => {
            return item.toString() == itemId;
        })){
            itemsBookmarked = itemsBookmarked.filter(item => item.toString() == itemId);
            message = "Bookmark removed";
        }else{
            itemsBookmarked.push(newItemId);
            message = "Item has been bookmarked";
        }
        await user.save();
        res.status(200).json({message});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



//get all items for a specific user by their id
// @route   GET api/postitems/:id
// @desc    get all items for a specific user by their ID
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        //find all items for a specific user by their id
        const items = await item.find({"seller": req.params.id});
        //if there is no item, send a 404 status
        if (!items) {
            return res.status(404).json({ msg: 'Item not found' });
        }
    
        res.json(items);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Item not found' });
        }
        
        res.status(500).send('Server Error');
    }
});


module.exports = router;
