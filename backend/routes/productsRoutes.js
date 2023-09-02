const express = require('express')
const router = express.Router()
const {getProducts, setProduct, updateProduct, deleteProduct} = require('../controllers/productsControllers')
const {isAdmin} = require('../middleware/authMiddleware')

router.get('/', isAdmin, getProducts)
router.post('/', isAdmin, setProduct)

router.put('/:id', isAdmin, updateProduct)
router.delete('/:id', isAdmin, deleteProduct)

module.exports = router