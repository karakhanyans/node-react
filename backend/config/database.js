const mongoose = require('mongoose');
mongoose.connect("mongodb://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST,
    {
        useNewUrlParser: true
    }
);

module.exports = mongoose;