const express = require('express');
const router = express.Router();
const greetingsController = require('../controllers/greetingsController');

router.get('/', greetingsController.getAllGreetings);
router.post('/', greetingsController.createGreeting);

module.exports = router;
