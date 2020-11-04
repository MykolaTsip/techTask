const Conf = require('../../config/config.enum')

module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define('Form', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            created_at: {
                type: DataTypes.STRING,
                default: new Date().toISOString()
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: Conf.DB_TABLE_NAME,
            timestamps: false
        })

    return Form
}
