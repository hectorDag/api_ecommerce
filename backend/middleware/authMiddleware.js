const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

const protect = asyncHandler (async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error ('Sin Autorizacion')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Sin Autorizacion')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.admin) {
      next()
    } else {
      res.status(401)
      throw new Error("No autorizado como administrador")
    }
  })

module.exports = {
    protect,
    isAdmin
}