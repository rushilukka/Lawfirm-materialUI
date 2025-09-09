const express = require('express');
const router = express.Router();
const { ADMIN_SERVER } = require('../constants/constants');

router.get('/', async (req, res) => {
    res.json({ message: 'Admin API is running' });
});

module.exports = router;
