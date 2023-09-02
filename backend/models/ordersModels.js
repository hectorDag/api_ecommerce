const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Especifica el producto que se desea Pedir'],
        ref: 'Product'
    },
    direction: {
        type: String,
        required: [true, 'Favor de especificar la direccion']
    },
    quantity: {
        type: Number,
        required: [true, 'Indique la Cantidad de Productos que desea']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)