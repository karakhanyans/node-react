const HTTP = require('http-status-codes');

// Get user data
exports.me = (req, res) => {
    let statusCode = HTTP.BAD_REQUEST;
    let success = false;
    let data = {};
    let errors = {};
    if (req.user) {
        data.user = req.user;
        statusCode = HTTP.OK;
        success = true;
    }
    return res.status(statusCode).json({success: success, data: data, errors: errors});
};