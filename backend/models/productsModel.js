const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Introdusca Nombre del Producto']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)