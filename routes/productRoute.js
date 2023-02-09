const express = require('express');
const { createProduct, getProduct, products } = require('../controller/productCtrl');
const { middleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/createproduct',middleware,createProduct)
router.get('/:id',middleware,getProduct)
router.get('/all',products)



module.exports = router;