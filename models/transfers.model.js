const { DataTypes } = require('sequelize');
const { dbTransfers } = require('../database/transfers.config');
// id, amount, senderuserid, receiveruserid
const Transfer = dbTransfers.define('transfers', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    senderUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
    },
    receiverUserId:{
            type: DataTypes.INTEGER,
            allowNull: false,
    },


}) ;

module.exports = Transfer;