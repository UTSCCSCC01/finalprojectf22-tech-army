const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
        default: [],
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model('Conversation', ConversationSchema);