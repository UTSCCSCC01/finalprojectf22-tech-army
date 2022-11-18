const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');

//http://localhost:8000/api/message

/*
    ROUTE: POST api/message
    DESC: Create new message 
    ACCESS: Private 
*/
router.post("/", async (req,res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    senderId: req.body.sender,
    text: req.body.text
  });

  try{
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  }catch(error){
    res.status(500).json(error)
  }
})

// @route   GET api/message
// @desc    Get all messages for a specific conversation
// @access  Private
router.get("/:conversationId", async (req,res) => {
  try{
    const messages = await Message.find({
      conversationId: req.params.conversationId, //fetches all messages with conversation ID same as the parameter
    });
    res.status(200).json(messages)
  }catch(error){
    res.status(500).json(error)
  }
})

module.exports = router;