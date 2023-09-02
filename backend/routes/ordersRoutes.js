const express = require('express')
const router = express.Router()
const {setOrders, getOrders} = require('../controllers/ordersControllers')
const {protect} = require('../middleware/authMiddleware')

router.post('/', protect, setOrders)
router.get('/', protect, getOrders)

module.exports = router