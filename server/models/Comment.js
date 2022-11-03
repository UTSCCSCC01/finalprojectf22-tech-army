const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    parentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    },
    itemID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
});

module.exports = Comment = mongoose.model('comment',CommentSchema);