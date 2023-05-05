const express = require('express')
const transfersController = require('./../controllers/transfers.controller')

const transfersRouter = express.Router();

transfersRouter
.route('/')
.get(transfersController.findAllTransfersPending)
.post(transfersController.createTransfer)

transfersRouter
.route('/:id')
.get(transfersController.findOneTransfer)
.patch(transfersController.updateTransfer)
.delete(transfersController.deleteTransfer)

module.exports = repairsRouter;