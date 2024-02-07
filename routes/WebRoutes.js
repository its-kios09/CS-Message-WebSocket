const express = require('express');
const controller = require('../controllers/WebController');

const router = express.Router();

router
    .route('/messages')
    .post(controller.sendMessages)
    .get(controller.getAllMessagesUnresponded);

router
    .route('/messages/:id')
    .patch(controller.respondMessages);

router
    .route('/messages/assign/:id')
    .patch(controller.assignMessageToAgent);

router
    .route('/messages/prioritize/:id')
    .patch(controller.urgentMessage);

router
    .route('/messages/search')
    .get(controller.searchMessage);

module.exports = router;
