const router = require('express').Router();
const { createNotification, getNotificationByUser, deleteNotification, readAllNotifications } = require('../controllers/notificationController');
const { auth } = require('../middlewares/authMiddlware');

router.post('/notify', auth, createNotification);
router.get('/get-all-notifications', auth, getNotificationByUser);
router.delete('/delete-notification/:id', auth, deleteNotification);
router.put('/read-all-notifications', auth, readAllNotifications);


module.exports = router;