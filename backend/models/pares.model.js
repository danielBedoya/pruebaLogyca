module.exports = (sequelize, Sequelize) => {
    const Pares = sequelize.define('pares', {
        numero: {
            type: Sequelize.INTEGER
        },
        gemelo: {
            type: Sequelize.INTEGER
        }
    })

    return Pares;
}