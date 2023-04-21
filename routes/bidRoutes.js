const router = require('express').Router();
const { placeBid, getAllBids, getAllBidsByProduct } = require('../controllers/bidController');
const { auth } = require('../middlewares/authMiddlware');


// Place a new bid
router.post('/get-all-bids', auth, getAllBids);
router.post('/get-all-bids-by-product', auth, getAllBidsByProduct);
router.post('/place-new-bid', auth, placeBid);


module.exports = router;