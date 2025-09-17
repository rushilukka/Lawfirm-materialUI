const jwt = require('jsonwebtoken');
require('dotenv').config();

function parseJwt(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = parseJwt;
