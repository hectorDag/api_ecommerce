const asyncHandler = require('express-async-handler')
const Order = require('../models/ordersModels')
const Product = require('../models/productsModel')

const getOrders = asyncHandler (async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})

const setOrders = asyncHandler (async (req, res) => {
    const {direction, quantity, productId} = req.body
    if(!direction || !quantity || !productId) {
        res.status(400)
        throw new Error ('Por favor llena todos los espacios ')
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
        res.status(404);
        throw new Error('Producto no encontrado');
    }

    const order = await Order.create({
        product: productId,
        direction,
        quantity
    })

    if (order) {
        res.status(201).json(order);
    } else {
        res.status(400);
        throw new Error('Error al crear el pedido');
    }
})

module.exports = {
    getOrders,
    setOrders
}