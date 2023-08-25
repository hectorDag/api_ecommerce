const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.status(200).json({message: 'Todos los Productos'})
})

router.post('/', (req,res) => {
    res.status(201).json({message: 'Producto Creado'})
})

router.put('/:id', (req,res) => {
    res.status(201).json({message: 'Producto Editado'})
})

router.delete('/:id', (req,res) => {
    res.status(200).json({message: 'Producto Borrado'})
})


module.exports = router