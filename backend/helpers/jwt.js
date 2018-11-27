const jwt = require('jsonwebtoken');

// Generate new JWT token
exports.sign = (email, id) => {
    return jwt.sign(
        {
            email: email,
            userId: id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );
};

// Check token for login
exports.verify = async (requestToken) => {
    let data = {
        decoded: false
    };
    let error = "";
    try {
        data.decoded = await jwt.verify(requestToken, process.env.JWT_SECRET, null);
    } catch (err) {
        error = err;
    }
    return {data: data, error: error};
};