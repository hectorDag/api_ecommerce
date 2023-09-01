const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea el Nombre del Producto']
    },
    price: {
        type: Number,
        required: [true, 'Por favor teclea el Precio del Producto']
    },
    description: {
        type: String,
        required: [true, 'Por favor teclea una Description']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)