const {Sequelize, DataTypes} = require('sequelize')
const path = require('path')
const fs = require('fs')

const Conf = require('../config/config.enum')

module.exports = (() => {
let instance;

function initConnection() {
const client = new Sequelize(Conf.DB_NAME, Conf.DB_USERNAME, Conf.DB_USERNAME_PASS, {
    host: 'localhost',
    dialect: 'mysql'
})

    let models = {}

    function getModel() {
fs.readdir(path.join(process.cwd(), 'database', 'model'), (err, files) => {
    files.forEach(file => {
        const [modelName] = file.split('.')
        models[modelName] = (require(path.join(process.cwd(), 'database', 'model', modelName)))(client, DataTypes)
    })
})
    }

    return {
setModel: () => getModel(),
        getModels: (modelName) => models[modelName]
    }
}

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection()
            }

            return instance
        }
    }
})()
