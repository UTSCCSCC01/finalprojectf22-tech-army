const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePictureURL: { 
        type: String,
        required: false,
    },
    coverImg: {
        type: String,
        required: false,
    },
    eventsJoined: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
        default: [],
    },
    eventsPosted: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
        default: [],
    },
});

module.exports = mongoose.model('user', UserSchema);