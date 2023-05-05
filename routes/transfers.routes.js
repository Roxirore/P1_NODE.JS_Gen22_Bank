const express = require('express');
const transfersController = require('./../controllers/transfers.controller');

const transfersRouter = express.Router();

transfersRouter.route('/').post(transfersController.createTransfer);

module.exports = transfersRouter;
