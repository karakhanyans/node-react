const expressValidator = require('express-validator');

module.exports = expressValidator({
    // Format errors json structure
    errorFormatter: function (param, msg) {
        return {
            message: msg
        }
    }
});