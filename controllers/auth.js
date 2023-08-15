const { tokenSign } = require('../utils/handleJWT')
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { usersModel } = require("../models")
const { httpHandleError, handleHttpError } = require('../utils/handleError')
/**
 * Este controlador maneja el registro de usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const body = {
            ...req,
            password: await encrypt(req.password)
        }
        const dataUser = await usersModel.create(body)
        dataUser.set("password", undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send({ data })
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

/**
 * Este controlador maneja el login
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({ email: req.email }).select("password name role email")
        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404)
            return
        }

        const handlePassword = user.get("password")
        const check = await compare(req.password, handlePassword)

        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401)
            return
        }

        user.set('password', undefined, { strict: false })
        const data = {
            token: await tokenSign(user),
            user
        }
        res.send({ data })
    } catch (e) {
        console.log(e);
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

module.exports = { registerCtrl, loginCtrl }