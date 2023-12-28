const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/config.js')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscore: true,
        modelName: 'comment'
    }
)

module.exports = Comment