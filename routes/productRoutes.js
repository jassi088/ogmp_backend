const router = require('express').Router();
const { addProduct, getAllProducts, editProduct, deleteProduct, uploadImage, updateProductStatus, getProduct } = require('../controllers/productController');
const { auth } = require('../middlewares/authMiddlware');
const multer = require('multer');



// get image from pc
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    },
});

router.post('/add-product', auth, addProduct);
router.post('/get-products', auth, getAllProducts);
router.get('/get-product-by-id/:id', auth, getProduct);
router.put('/edit-product/:id', auth, editProduct);
router.put('/update-product-status/:id', auth, updateProductStatus);
router.delete('/delete-product/:id', auth, deleteProduct);



router.post('/upload-product-image', auth, multer({ storage: storage }).single('file'), uploadImage);



module.exports = router;

