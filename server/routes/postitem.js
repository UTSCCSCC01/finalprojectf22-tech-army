const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const item = require('../models/item');
const User = require('../models/User');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const Item = require('../models/item');

router.post("/uploadItem", auth, (req, res) => {
    req.body.seller = new mongoose.mongo.ObjectId(req.user.id);
    const item = new Item(req.body)
    item.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});

router.post("/getItems", auth, (req, res) => {

    Item.find({"hidden": false})
    .exec( (err, items) => {
        if (err) return res.status(400).json({success:false,err})

        res.status(200).json({success:true , items})
    } )

});

router.get("/items_by_id", auth, (req, res) => {
    let type = req.query.type
    let itemIds = req.query.id

    if (type === "array") {

    }
    //we need to find the product information that belong to product Id 
    Item.find({ '_id': { $in: itemIds } })
        .populate('writer')
        .exec((err, item) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(item)
        })
});


// @route   GET api/postitems
// @desc    Get all Items
// @access  Private
router.get('/', auth, (req, res) => {
    try {
        //find all items without any filters
        const items = item.find();
        //send the items back to the client
        res.json(items);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        res.status(500).send('Server Error');
    }
});

// @route   GET api/items/getUserItems
// @desc    Get an array of items that the user has bookmarked or has added to cart
// @access  Private
router.get('/getUserItems', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const itemsBookmarked = user.itemsBookmarked;
        const itemsInCart = user.itemsInCart;
        const itemsBookmarkedObjs = await item.find({ '_id': { $in: itemsBookmarked } });
        const itemsInCartObjs = await item.find({ '_id': { $in: itemsInCart } });
        res.status(200).json({itemsBookmarked: itemsBookmarkedObjs, itemsInCart: itemsInCartObjs});
    } catch (err) {
        console.log(err);  
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/postitem/:id
// @desc    Add/remove item from cart
// @access  Private
router.put('/addToCart/:id', auth, async (req, res) => {
    try {
        const itemId = req.params.id;
        const userId = req.user.id;
        const user = await User.findById(userId);
        const item = await Item.findById(itemId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        const newItemId = new mongoose.mongo.ObjectId(itemId);
        const itemsInCart = user.itemsInCart;
        let message = "";
        const index = itemsInCart.findIndex(item => item.toString() == itemId);
        if(index != -1){
            itemsInCart.splice(index, 1);
            message = "Item removed from cart";
            item.hidden = false;
        }else{
            itemsInCart.push(newItemId);
            message = "Item has been added to cart";
            item.hidden = true;
        }
        await user.save();
        await item.save();
        res.status(200).json({message});
    } catch (err) {
        console.error(err.message);
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
        let message = "";
        const index = itemsBookmarked.findIndex(item => item.toString() == itemId);
        if(index != -1){
            itemsBookmarked.splice(index, 1);
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

//edit an item by its id 
// @route   PUT api/postitem/:id
// @desc    edit an item by its ID
// @access  Private
router.put('/editItem/:id', auth, async (req, res) => {
    try {
        //find the item by its id
        const itemObj = await item.findById(req.params.id);
        // const users = await user.findById(req.params.id);
        // const user
        //if there is no item, send a 404 status
        if (!itemObj) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        //if the user is not the seller, send a 401 status
        if (itemObj.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        // if () {
            
        // }
        //update the item
        itemObj.title = req.body.title;
        itemObj.description = req.body.description;
        itemObj.price = req.body.price;
        //save the item
        await itemObj.save();
        //send the item back to the client
        res.json(itemObj);
    } catch (err) {
        console.error(err.message);
        //if there is an error, send a 500 status
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Item not found' });
        }
        res.status(500).send('Server Error');
    }
});

//delete an item by its id
// @route   DELETE api/postitem/:id
// @desc    delete an item by its ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        //find the item by its id
        const itemObj = await item.findById(req.params.id);
        //if there is no item, send a 404 status
        if (!itemObj) {
            return res.status(404).json({ msg: 'Item not found' });
        }
        //if the user is not the seller, send a 401 status
        if (itemObj.seller.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        //delete the item
        await itemObj.remove();
        //send a success message
        res.json({ msg: 'Item removed' });
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
