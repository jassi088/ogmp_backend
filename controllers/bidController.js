const asyncHandler = require('express-async-handler');
const Bid = require('../models/Bid');



// Place a bid
const placeBid = asyncHandler(async (req, res) => {

    await Bid.create(req.body);
    res.send({
        success: true,
        message: 'Bid Placed Successfully',
    });

});

// Get all bids
const getAllBids = asyncHandler(async (req, res) => {

    const { product, seller, userId } = req.body;

    // console.log(req.body)
    // console.log(product)

    let filters = {};
    if (product) {
        filters.product = product;
    }
    if (seller) {
        filters.seller = seller;
    }
    if (userId) {
        filters.buyer = userId;
    }
    // console.log(filters);

    const bids = await Bid.find(filters).populate('product').populate('buyer').populate('seller').sort({ createdAt: -1 });

    // console.log(bids);
    res.send({
        success: true,
        data: bids,
    });
});

const getAllBidsByProduct = asyncHandler(async (req, res) => {

    const { product } = req.body;

    // console.log(req.body)
    // console.log(product)

    const bids = await Bid.find({product}).populate('product').populate('buyer').populate('seller').sort({ createdAt: -1 });

    // console.log(bids);
    res.send({
        success: true,
        data: bids,
    });
});




module.exports = {
    placeBid,
    getAllBids,
    getAllBidsByProduct
}