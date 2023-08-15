const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

/**
 * Se debe pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sing = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    )

    return sing
}

/**
 * Se debe pasar el token de sesion
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJWT) => {
    try {
        return jwt.verify(tokenJWT, JWT_SECRET)
    } catch (e) {
        return e
    }
}

module.exports = { tokenSign, verifyToken }