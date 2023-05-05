const { Sequelize } = require('sequelize');

const dbTransfers = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'MyPostgreSQL!',
    database: 'dbbanktransfers',
    port: 5432,
    logging: false,
});

module.exports = { dbTransfers };