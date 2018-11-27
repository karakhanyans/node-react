const jwtHelper = require('../helpers/jwt');
const HTTP = require('http-status-codes');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    let requestToken = "";
    if (req.headers.authorization) {
        requestToken = req.headers.authorization;
    }
    let success = false;
    let statusCode = HTTP.BAD_REQUEST;
    let data = {};
    let errors = {};
    const verify = await jwtHelper.verify(requestToken.split(' ')[1]);
    if (verify.error) {
        success = false;
        errors.message = verify.error;

        return res.status(statusCode).json({
            success: success,
            data: data,
            errors: errors
        });
    }

    await User.findOne({_id: verify.data.decoded.userId}).then(async user => {
        data.user = user;
    });
    req.user = data.user;
    next();
};