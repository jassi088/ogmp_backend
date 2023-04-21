const mongoose = require('mongoose');


const notificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    onClick: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    read: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});


const Notification = mongoose.model('notification', notificationSchema);
module.exports = Notification;