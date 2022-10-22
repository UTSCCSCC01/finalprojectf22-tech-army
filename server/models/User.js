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
    }
});

module.exports = mongoose.model('user', UserSchema);