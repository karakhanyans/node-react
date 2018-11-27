const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    photo: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);