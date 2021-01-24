module.exports = app => {
    const numeros = require("../controllers/numeros.controler.js")

    var router = require("express").Router()

    router.post("/primos", numeros.getPrimos)

    router.post("/gemelos", numeros.findPares)

    router.post("/primosnobd", numeros.getPrimosNoBD)

    router.post("/gemelosnobd", numeros.paresNoBD)

    app.use('/api/numeros', router);
}