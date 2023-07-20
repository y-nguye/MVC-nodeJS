const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase');
        console.log('Connected successfully ✅');
    } catch (error) {
        console.log('Connected fail 🆘');
    }
}

module.exports = { connect };
