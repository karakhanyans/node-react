const bcrypt = require('bcrypt');

// Hash password
exports.hash = async (password) => {
    let error = "";
    let data = {};
    await bcrypt.hash(password, 10).then(hash => {
        data = hash;
    }).catch(err => {
        error = err.message;
    });
    return {data: data, error: error};
};

// Compare request and DB passwords
exports.compare = async (requestPassword, userPassword) => {
    let error = "";
    let data = {
        compare: false
    };
    await bcrypt.compare(requestPassword, userPassword).then(async res => {
        if (res) {
            data.compare = true;
        }
    }).catch(err => {
        error = err;
    });
    return {data: data, error: error};
};