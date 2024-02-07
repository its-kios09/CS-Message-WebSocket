const Message = require('../models/model');

exports.sendMessages = async (req, res,next) => {
    try {
        const { userId, messageBody } = req.body;
        // Emitting the message to WebSocket clients
        io.emit('newMessage', { userId, messageBody });
        res.status(201).json({ status: 'success' });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
}

exports.getAllMessagesUnresponded = async (req, res,next) => {
    try {
        const messages = await Message.find({ responded: false });
        res.status(200).json({ status: 'success', messages });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
}

exports.respondMessages = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { agentId, response } = req.body;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ status: 'error', message: '[itskios-09]: Message not found' });
        }
        message.responded = true;
        message.agentId = agentId;
        message.response = response;
        await message.save();
        res.status(200).json({ status: 'success', message });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
}
exports.assignMessageToAgent = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { agentId } = req.body;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ status: 'error', message: '[itskios-09]: Message not found' });
        }
        if (message.assigned) {
            return res.status(400).json({ status: 'error', message: '[itskios-09]: Message already assigned' });
        }
        message.agentId = agentId;
        message.assigned = true;
        await message.save();
        res.status(200).json({ status: 'success', message });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
}
exports.urgentMessage = async (req, res,next) => {
    try {
        const { id } = req.params;
        const { priority } = req.body;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ status: 'error', message: '[itskios-09]: Message not found' });
        }
        message.priority = priority;
        await message.save();
        res.status(200).json({ status: 'success', message });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
}
exports.searchMessage = async (req, res,next) => {
    try {
        const { query } = req.query;
        const messages = await Message.find({ $text: { $search: query } });
        res.status(200).json({ status: 'success', messages });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
}