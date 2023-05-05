const catchAsync = require('../utils/catchAsync');
const Transfer = require('./../models/transfers.model');
// //controllers sin id


exports.findAllTransfers = catchAsync (async (req, res) => {


    const transfers = await Transfer.findAll({
      where: {
        status: 'pending',
      },
    });
  
    res.status(200).json({
      status: 'success',
      message: `The pending repairs of user were counted`,
      results: repairs.length,
      repairs,
    });

});

exports.createRepair = catchAsync (async (req, res) => {


    const { userid, date } =
      req.body;
  
    const repair = await Repair.create({
      userid,
      date,
    });
  
    res.status(201).json({
      status: 'success',
      message: 'The repair has been created!',
      repair,
    });

});


// //controllers con id

exports.updateRepair = catchAsync (async (req, res) => {


    // traer el userid de la res.params
    const { id } = req.params;
    // buscar la repair a actualizar
    const repair = await Repair.findOne({
      where: {
          id,
          status: 'pending',
      },
    });
    // validar si la repair existe, sino error
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `the repair with id: ${id} is not found`,
      });
    }
    // usar el update para pasar el estado a pending o completed
    await repair.update({ status: 'completed' });
    res.status(200).json({
      status: 'success',
      message: 'the repair has been completed',
    });


});

exports.deleteRepair = catchAsync (async (req, res) => {
    
    // traer el userid de la res.params
    const { id } = req.params;
    // buscar la repair a actualizar
    const repair = await Repair.findOne({
      where: {
          id,
          status: 'pending' 
      },
    });
    // validar si la repair existe, sino error
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `the repair with id: ${id} is not found`,
      });
    }
    // usar el update para pasar el estado a pending o completed
    await repair.update({ status: 'cancelled' });
    res.status(200).json({
      status: 'success',
      message: 'the repair has been cancelled',
    });

});

exports.findOneRepair = catchAsync (async (req, res) => {
    
    const { id } = req.params;
  
    const repair = await Repair.findOne({
      where: {
        id,
      },
    });
    if (!repair) {
      return res.status(404).json({
        message: `The repair with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: 'The repair has been found successfully',
      repair,
    });

});
