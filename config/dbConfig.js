const mongoose = require("mongoose");

const dbConnect = (url) => {
    try {
        const conn = mongoose.connect(url);
        if (conn) {
            console.log('Connection with Mongodb Successfull');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;