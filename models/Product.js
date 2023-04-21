const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        default: [],
        required: true
    },
    billAvailiable: {
        type: Boolean,
        default: false,
        required: true,
    },
    warrantyAvailiable: {
        type: Boolean,
        default: false,
        required: true,
    },
    accessoriesAvailiable: {
        type: Boolean,
        default: false,
        required: true,
    },
    boxAvailiable: {
        type: Boolean,
        default: false,
        required: true,
    },
    showBidsOnProductPage: {
        type: Boolean,
        default: false,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        requird: true,
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('product', productSchema);
module.exports = Product;

