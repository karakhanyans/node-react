const User = require('../models/user');
const jwtHelper = require('../helpers/jwt');
const HTTP = require('http-status-codes');
const passwordHelper = require('../helpers/password');
const storage = require('../helpers/storage');

// Registration
exports.registration = async (req, res) => {
    let statusCode = HTTP.BAD_REQUEST;
    let success = false;
    let data = {};
    let errors = {};
    let validationErrors = req.validationErrors(true);
    if (validationErrors) {
        statusCode = HTTP.UNPROCESSABLE_ENTITY;
        errors.validation = validationErrors;
    } else {
        let photo = req.files.photo;
        const fileName = new Date().getTime() + '_' + photo.name;
        storage.upload(photo, storage.uploadPath + fileName);
        let password = await passwordHelper.hash(req.body.password);
        if (password.error) {
            errors.message = password.error;
        } else {
            password = password.data;
        }
        let user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            photo: fileName,
            password: password
        });
        await user.save()
            .then(res => {
                data.user = res;
                statusCode = HTTP.CREATED;
                success = true;
            }).catch(err => {
                errors = err.message;
            });
    }
    return res.status(statusCode).json({success: success, data: data, errors: errors});
};

// Login
exports.login = async (req, res) => {
    let statusCode = HTTP.BAD_REQUEST;
    let success = false;
    let data = {};
    let errors = {};
    await User.findOne({email: req.body.email}).then(async user => {
        if (user) {
            const compare = await passwordHelper.compare(req.body.password, user.password);
            if (compare.errors) {
                errors.message = compare.errors;
            } else if (!compare.data.compare) {
                errors.message = 'wrong_credentials';
                statusCode = HTTP.UNPROCESSABLE_ENTITY;
            } else {
                const token = await jwtHelper.sign(user.email, user._id);
                data.user = user;
                data.token = token;
                success = true;
                statusCode = HTTP.OK;
            }
        } else {
            errors.message = 'wrong_credentials';
            statusCode = HTTP.UNPROCESSABLE_ENTITY;
        }
    }).catch(err => {
        errors.message = err;
    });
    return res.status(statusCode).json({success: success, data: data, errors: errors});
};