module.exports = (sequelize, Sequelize) => {
    const Numeros = sequelize.define('numeros', {
        numero: {
            type: Sequelize.INTEGER
        },
        esPrimo: {
            type: Sequelize.BOOLEAN
        }
    })

    return Numeros;
}