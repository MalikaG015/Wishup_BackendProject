const express = require('express');

const router = express.Router();

const subscriptionController = require('../controllers/subscriptionController');
const userController = require('../controllers/userController');


router.put('/user', userController.createUser);
router.get('/user/:userName', userController.getUser);
router.post('/subscription',subscriptionController.createSubscription);
router.get('/subscription/:userName/:date?',subscriptionController.getSubscription);




module.exports = router;