const {check, body} = require('express-validator/check');
const User = require('../models/user');
const path = require('path');

module.exports = [
    check('first_name').not().isEmpty().withMessage('First Name field is required'),
    check('first_name').isLength({max: 255}).withMessage('must be maximum 255 chars'),
    check('last_name').not().isEmpty().withMessage('Last Name field is required'),
    check('last_name').isLength({max: 255}).withMessage('must be maximum 255 chars'),
    check('email').not().isEmpty().withMessage('Email field is required'),
    check('email').isEmail(),
    body('email').custom((value) => {
        return User.findOne({email: value}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    body('photo').custom(async (value, {req}) => {
        if (req.files === null) {
            return Promise.reject('Photo field is required');
        } else {
            const file = req.files.photo;
            const allowedExtension = ['.jpg', '.jpeg', '.png'];
            const extension = (path.extname(file.name)).toLowerCase();
            if (allowedExtension.indexOf(extension) < 0) {
                return Promise.reject('Photo must be .jpg,.jpeg or .png');
            }
        }
    }),
    check('password').not().isEmpty().withMessage('Password field is required'),
    check('password').isLength({min: 6}).withMessage('must be at least 6 chars long'),
    check('password').isLength({max: 12}).withMessage('must be maximum 12 chars'),
    check('confirm_password').not().isEmpty().withMessage('Confirm Password field is required'),
    body('confirm_password').custom(async (value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
    })
];