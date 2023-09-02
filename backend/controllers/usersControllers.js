const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerUser = asyncHandler ( async (req,res) => {
    const {name, email, password, admin} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Por favor llena todos los Espacios')
    }

    const existingUser = await User.findOne({email})
    if(existingUser) {
        res.status(400)
        throw new Error ('Usuario ya Registrado')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        admin
    })

    if(user) {
        if(user.admin != true){
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
            })
        }else {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin
            })
        }
    }else {
        res.status(400)
        throw new Error ('Error al Crear Usuario')
    }
})

const loginUser = asyncHandler ( async (req,res) => {
    const {email, password} = req.body

    const generatedToken = (id) => {
        return jwt.sign({id},process.env.JWT_SECRET, {
            expiresIn: '60m'
        })
    }

    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generatedToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error ('Credenciales Incorrectas')
    }
})

module.exports = {
    registerUser,
    loginUser
}