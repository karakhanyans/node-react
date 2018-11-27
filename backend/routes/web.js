const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkAuth = require('../middlewares/checkAuth');

router.get('/me', [checkAuth], UserController.me);

module.exports = router;