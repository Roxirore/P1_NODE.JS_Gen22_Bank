const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');
const usersMiddlewares = require('./../middlewares/users.middlewares');

// controllers sin userid

exports.findAllUsers = catchAsync (async (req, res) => {

    
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });
    res.json({
      message: 'the users were found successfully',
      results: users.length,
      users,
    });


});


//controllers con userid


exports.findOneUser = catchAsync (async (req, res) => {

    const { userid } = req.params;
    const { user } = req;
  

    res.status(200).json({
      message: `the user with id ${userid} was found successfully`,
      user,
    });

});

exports.updateUser = catchAsync (async (req, res) => {

    
    const { userid } = req.params;
    // traer la informacióm que quiero actualizar
    const { role, status } = req.body;
    // traer el user de la req (validation)
    const { user } = req;
    // ubicar el usuario a actualizar
    await User.findOne({
      where: {
        userid,
        role: 'client',
        status: 'available',
      },
    });
  // actualizar el role
    await user.update({role: 'employee'});

    res.status(200).json({
      status: 'success',
      message: 'the client upgraded to employee',
    });

});

exports.deleteUser = catchAsync (async (req, res) => {
    // traer en usuario del validations.middlewares
    const { user } =  req;
    // traer el userid de la res.params
    const { userid } = req.params;
    // traer la informacióm que quiero actualizar
    const { status } = req.body;
    // buscar el usuario a actualizar
    await User.findOne({
      where: {
        userid,
        status: 'available',
      },
    });
    // validar si el usuario existe sino error
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `the user with id: ${userid} is not found`,
      });
    }
    // usar el update para pasar el estado a unavailable o cancelled
    await user.update({ status: 'disabled' });

    res.status(200).json({
      status: 'success',
      message: 'the user has been disabled',
    });

});

