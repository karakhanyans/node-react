const express = require('express');
const router = express.Router();
const webRoutes = require('./web');
const authRoutes = require('./auth');

router.use('/', webRoutes);
router.use('/auth', authRoutes);

module.exports = router;
