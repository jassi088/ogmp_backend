const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const User = require('../models/User');
const Notification = require('../models/Notification');
const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinaryConfig');


// Create a new product
const addProduct = asyncHandler(async (req, res) => {

    await Product.create(req.body);
    const sellerName = await User.findById(req.body.seller);

    // send notification
    const admins = await User.find({ role: 'admin' });


    admins?.forEach(async (admin) => {
        await Notification.create({
            user: admin._id,
            message: `New Product added by ${sellerName.name}`,
            title: 'New Product',
            onClick: "/admin",
            read: false,
        });
    });
    res.send({
        success: true,
        message: "Product created successfully",
    });
});


// Get all products
const getAllProducts = asyncHandler(async (req, res) => {

    const { seller, category, age, status } = req.body;
    // console.log(req.body);
    let filters = {};

    if (seller) {
        filters.seller = seller;
    }
    if (status) {
        filters.status = status;
    }

    // filter by category
    if (category?.length > 0) {
        filters.category = { $in: category }
    }

    // filter by age
    if (age?.length > 0) {
        age.forEach((item) => {
            const fromAge = item.split('-')[0];
            const toAge = item.split('-')[1];
            filters.age = { $gte: fromAge, $lte: toAge };
        })
    }

    const products = await Product.find(filters).populate('seller').sort({ createdAt: -1 });
    if (products?.length > 0) {
        res.send({
            success: true,
            data: products,
        })
    } else {
        throw new Error("No product found");
    }
});

// Edit product
const editProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        await Product.findByIdAndUpdate(id, req.body);
        res.send({
            success: true,
            message: 'Product updated successfully',
        })
    } else {
        throw new Error('Not a valid product ID');
    }
});


// Delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (mongoose.isValidObjectId(id)) {
        await Product.findByIdAndDelete(id);
        res.send({
            success: true,
            message: 'Product deleted successfully',
        })
    } else {
        throw new Error('Not a valid product ID');
    }
});



// Upload product images
const uploadImage = async (req, res) => {
    // console.log(req.file , req.body);
    try {
        // upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ogmp'
        });
        const productId = req.body.productId;
        await Product.findByIdAndUpdate(productId, {
            $push: { images: result.secure_url },
        });
        res.send({
            success: true,
            message: "Image uploaded successfully",
            data: result.secure_url,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
};


const updateProductStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    // console.log(status)
    // console.log(id)

    const updatedProduct = await Product.findByIdAndUpdate(id, { status }, { new: true });
    // console.log(updatedProduct);

    // Send notification to user who added the product
    // send notification to seller
    const newNotification = new Notification({
        user: updatedProduct.seller,
        message: `Your product ${updatedProduct.name} has been ${updatedProduct.status}`,
        title: "Product Status Updated",
        onClick: '/profile',
        read: false,
    });

    await newNotification.save();
    res.send({
        success: true,
        message: 'Product status updated successfully',
    });
});


const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const products = await Product.findById(id).populate({ path: 'seller', select: '-password' });
    res.send({
        success: true,
        data: products,
    });
});


module.exports = {
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
    uploadImage,
    updateProductStatus,
    getProduct,
};