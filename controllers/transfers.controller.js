const catchAsync = require('../utils/catchAsync');
const Transfer = require('./../models/transfers.model');
const { updatedPassword } = require('./auth.controller');

exports.createTransfer = catchAsync (async (req, res) => {

    // 1. recibir el amount, accountNumber, senderUserId de la req.body
    const { amount, accountNumber, senderUserId } = req.body;
  
    // 2. buscar el usuario (userReceiver) que va a  recibir el monto con findOne, con status: true y 
    // accountNumber: accountNumber 
    const userReceiver = await User.findOne({
        where: {
            accountNumber,
            status: 'available',
        },
      });

    // 3. crear una constante que se llame receiverUserId = UserReceiver.id
    const receiverUserId = userReceiver.id;

    // 4. buscar al usuario que hace la transferencia (userTransfer) con el senderUserId
    const userTransfer = await User.findOne({
        where: {
            status: 'available',
            id: senderUserId,
        }
    })

    // 5. verificar si el monto a transferir es mayor al monto que tiene userTransfer, 
    // enviar error 400
    if (amount > userTransfer.amount) {
        return res.status(400).json({
            status: 'fail',
            message: 'The amount in the account is less than the amount you want to transfer',
          });
    }

    // 6. verificar si el UserTransfer.id = UserReceiver.id, enviar error
    if (userTransfer.id === userReceiver.id) {
        return res.status(400).json({
            status: 'fail',
            message: 'The user cannot send money to his own account',
          });
    }

    // 7. crear una constante que se llame newAmountUserTransfer, en ella va el resultado
    // de restar el UserTransfer.amount menos el amount de la req.body
    const newAmountUserTransfer = userTransfer.amount - amount;

    // 8. crear una constante que se llame newAmountUserReceiver, en ella va el resultado
    // de sumar el userReceiver.amount mas el amount de la req.body
    const newAmountUserReceiver = userReceiver.amount + amount;

    // 9. actualizar la informacion del userTransfer con su nuevo amount
    await userTransfer.update({amount: newAmountUserTransfer})

    // 10. actualizar la informacion del userReceiver con su nuevo amount
    await userReceiver.update({amount: newAmountUserReceiver})

    // 11. guardar o crear la transferencia en la base de datos
    await Transfer.create({ amount, senderUserId, receiverUserId})

    // 12. enviar la respuesta al cliente que la transferencia fue exitosa
    res.status(201).json({
      status: 'success',
      message: 'The transfer has been done!',
      Transfer,
    });

});



// PASOS
// 1. reciibir el amount, accountNumber, senderUserId de la req.body
// 2. buscar el usuario (userReceiver) que va a  recibir el monto con findOne, con status: true y 
// accountNumber: accountNumber 
// 3. crear una constante que se llame receiverUserId = UserReceiver.id
// 4. buscar al usuario que hace la transferencia (userTransfer) con el senderUserId
    // const userTransfer = await User.findOne({
    //     where: {
    //         status: true,
    //         id: senderUserId,
    //     }
    // })
// 5. verificar si el monto a transferir es mayor al monto que tiene userTransfer, 
// enviar error 400
    // if (amount > userTransfer.amount) {mensaje de error}
// 6. verificar si el UserTransfer.id = UserReceiver.id, enviar error
// 7. crear una constante que se llame newAmountUserTransfer, en ella va el resultado
// de restar el UserTransfer.amount menos el amount de la req.body
// 8. crear una constante que se llame newAmountUserReceiver, en ella va el resultado
// de sumar el userReceiver.amount mas el amount de la req.body
// 9. actualizar la informacion del userTransfer con su nuevo amount
    // await userTransfer.update({amount: newAmountUserTransfer})
// 10. actualizar la informacion del userReceiver con su nuevo amount
    // await userReseirver.update({amount: newAmountUserReceiver})
// 11. guardar o crear la transferencia en la base de datos
    // await Transfer.create({ amount, senderUserId, receiverUserId})
// 12. enviar la respuesta al cliente que la transferencia fue exitosa