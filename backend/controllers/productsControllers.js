const asyncHandler = require('express-async-handler')
const Product = require('../models/productsModel')

const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

const setProduct = asyncHandler( async (req, res) => {
    const {name, price, description} = req.body
    if(!name || !price || !description) {
        res.status(400)
        throw new Error ('Por favor llena todos los espacios ')
    }

    const product = await Product.create({
        name, 
        price, 
        description
    })

    res.status(201).json(product)
})

const updateProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product){
        res.status(404)
        throw new Error ('El Producto no fue encontrado')
      } else {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedProduct)
    }
})

const deleteProduct = asyncHandler( async (req, res) => {

    const product = await Product.findById(req.params.id)
    
    if(!product){
        res.status(404)
        throw new Error ('El Producto no fue encontrado')
      } else {
        product.deleteOne()
    }

    res.status(200).json({id: product.id})
})

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct
}

