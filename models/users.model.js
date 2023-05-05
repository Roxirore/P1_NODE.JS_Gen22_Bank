const { DataTypes } = require('sequelize');
const { dbUsers } = require('../database/users.config');
// id, name, accountNumber, password, amount, status
const User = dbUsers.define('users', {
    userId: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    accountNumber:{
            type: DataTypes.INTEGER,
            allowNull: false,
    },
    password:{
            type: DataTypes.STRING,
            allowNull: false,
    },
    amount:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1000,
    },
    status:{
            type: DataTypes.ENUM('available','disabled'),
            allowNull: false,
            defaultValue: 'available',
    },

}) ;

module.exports = User;