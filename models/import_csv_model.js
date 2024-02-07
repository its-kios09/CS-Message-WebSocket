const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    messageBody: {
        type: String,
        required: true
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
