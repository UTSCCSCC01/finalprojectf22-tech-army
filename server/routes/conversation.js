const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

//http://localhost:8000/api/conversation

/*
    ROUTE: POST api/conversation
    DESC: Create new conversation
    ACCESS: Private 
*/
router.post("/", async (req,res) => {
  const newConversation = new Conversation({
    members:[req.body.senderId, req.body.receiverId],
  });

  try{
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation)
  }catch(error){
    res.status(500).json(error)
  }
})

// @route   GET api/conversation
// @desc    Get all conversations for a specific user
// @access  Private
router.get("/:userId", async (req,res) => {
  try{
    const conversation = await Conversation.find({
      members: { $in:[req.params.userId] },
    });
    res.status(200).json(conversation)
  }catch(error){
    res.status(500).json(error)
  }
})

module.exports = router;