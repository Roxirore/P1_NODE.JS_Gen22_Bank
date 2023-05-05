const Transfer = require('../models/transfers.model');
const catchAsync = require('../utils/catchAsync');


exports.validTransfers = catchAsync ((req, res, next) => {
  const { amount, senderUserId, receiverUserId } = req.body;
  if (!amount) {
    return res.status(400).json({
      status: 'error',
      message: 'the amount is required',
    });
  }

  if (!senderUserId) {
    return res.status(400).json({
      status: 'error',
      message: 'the senderUserId is required',
    });
  }

  if (!receiverUserId ) {
    return res.status(400).json({
      status: 'error',
      message: 'the receiverUserId  is required',
    });
  }

  next();
});

exports.validExistTransfer = catchAsync (async (req, res, next) => {
  const { id } = req.params;

  const transfer = await Transfer.findOne({
    where: {
      id,
    },
  });

  if (!transfer) {
    return res.status(404).json({
      status: 'error',
      message: `Transfer with id: ${id} not found`,
    });
  }

  req.transfer = transfer;
  next();
});
