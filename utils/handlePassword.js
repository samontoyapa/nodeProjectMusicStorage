const bcryptjs = require('bcryptjs')

/**
 * contraseña sin encriptar: hola123
 * @param {*} passwordPlane 
 */
const encrypt = async (passwordPlane) => {
    const hash = await bcryptjs.hashSync(passwordPlane, 10)
    return hash
}

/**
 * comparar hashed con password plano
 * @param {*} passwordPlane 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlane, hashPassword) => {
    return bcryptjs.compare(passwordPlane, hashPassword)
}

module.exports = { encrypt, compare }