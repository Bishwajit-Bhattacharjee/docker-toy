const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(
        'mongodb://mongo:27017/my-db',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
}

module.exports = connect;