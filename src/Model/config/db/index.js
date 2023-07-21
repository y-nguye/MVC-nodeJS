const mongoose = require('mongoose');

async function connect() {
    await mongoose
        // .connect(
        //     'mongodb+srv://admin:123@testapi.t4drskm.mongodb.net/?retryWrites=true&w=majority/myDatabase'
        // )
        .connect('mongodb://127.0.0.1:27017/myDatabase')
        .then(() => console.log('Connected! ✅'))
        .catch(() => console.log('connection failed 🆘'));
}

module.exports = { connect };
