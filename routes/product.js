const express = require('express');
const router = express.Router()
const productController = require('../controllers/productController');

router.post('/', productController.createdProduct)
router.get('/', productController.getAllProduct)
router.get('/:id', productController.getProduct)
router.get('/category/:categoryName', productController.getAllProductByCategory)
router.get('/search/products/:key', productController.searchProduct)



module.exports = router