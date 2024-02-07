// model.js
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
    },
    responded: {
        type: Boolean,
        default: false
    },
    agentId: {
        type: Number,
        default: null
    },
    response: {
        type: String,
        default: ''
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    assigned: {
        type: Boolean,
        default: false
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
