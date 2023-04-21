const Notification = require('../models/Notification');
const asyncHandler = require('express-async-handler');

const createNotification = asyncHandler(async (req, res) => {
    await Notification.create(req.body);
    res.send({
        success: true,
        message: 'Notification added successfully',
    });
});


const getNotificationByUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const notifications = await Notification.find({
        user: userId,
    }).populate('user');
    res.send({
        success: true,
        data: notifications,
    });
});

const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.send({
        success: true,
        message: 'Notification deleted successfully',
    });
});



const readAllNotifications = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    await Notification.updateMany(
        { user: userId, read: false },
        { $set: { read: true } }
    );
    res.send({
        success: true,
        message: "All notifications marked as read"
    })
});

module.exports = {
    createNotification,
    getNotificationByUser,
    deleteNotification,
    readAllNotifications
}