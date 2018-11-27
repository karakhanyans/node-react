const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const registrationRequest = require('../requests/registrationRequest');

router.post('/register', [registrationRequest], AuthController.registration);
router.post('/login', AuthController.login);

module.exports = router;