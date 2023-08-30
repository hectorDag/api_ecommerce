const express = require('express')
const router = express.Router()
const {getProducts, setProduct, updateProduct, deleteProduct} = require('../controllers/productsControllers')


router.get('/', getProducts)
router.post('/', setProduct)

router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router