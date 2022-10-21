const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
    //title of the event
    title: {
        type: String,
        required: true,
    },
    //may need to change required to false as it is not required, not sure yet.
    description: {
        type: String,
        required: true,
    }
    //date is a string because it is easier to work with
    // date: {
    //     type: Date,
    //     required: true,
    // },
    // //use the user model to create a relationship between the user and the event
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
});

module.exports = mongoose.model('event', EventSchema);

