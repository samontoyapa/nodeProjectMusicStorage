const customHeader = (req, res, next) => {
    try {
        const apiKey = req.headers.api_key
        console.log("api_key", apiKey);
        if (apiKey === "samontoyapa"){
            next()
        }else {
            res.status(403)
            res.send({error: "API_KEY_NO_ES_CORRECTO"})
        }
    } catch (error) {
        res.status(403)
        res.send({error: "ALGO_OCURRIO_EN_EL_CUSTOM_HEADER"})
    }
}

module.exports = customHeader