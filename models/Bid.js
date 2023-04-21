const mongoose = require('mongoose');


const bidSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    bidAmount: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});


const Bid = mongoose.model('bid', bidSchema);
module.exports = Bid;