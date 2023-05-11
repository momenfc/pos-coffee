const APIFeatures = require('../utils/APIFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const factory = {};

factory.getAll = Modal =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Modal.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      code: 200,
      status: 'succes',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

factory.getOne = (Modal, popOptions) =>
  catchAsync(async (req, res, next) => {
    const query = Modal.findById(req.params.id);
    if (popOptions) query.populate(popOptions);

    try {
      const doc = await query;
      // console.log('catchAsync  doc:', doc);
      res.status(200).json({
        code: 200,
        status: 'succes',
        data: {
          data: doc,
        },
      });
    } catch (error) {
      // if (!doc) return
      next(new AppError('No document found with that ID', 404));
    }
  });

factory.addOne = Modal =>
  catchAsync(async (req, res, next) => {
    const doc = await Modal.create(req.body);
    res.status(201).json({
      code: 201,
      status: 'succes',
      data: {
        data: doc,
      },
    });
  });

factory.updateOne = Modal =>
  catchAsync(async (req, res, next) => {
    const doc = await Modal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(201).json({
      code: 201,
      status: 'succes',
      data: {
        data: doc,
      },
    });
  });

// factory.update = Modal =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Modal.u(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!doc) return next(new AppError('No document found with that ID', 404));

//     res.status(201).json({
//       code: 201,
//       status: 'succes',
//       data: {
//         data: doc,
//       },
//     });
//   });

factory.deleteOne = Modal =>
  catchAsync(async (req, res, next) => {
    const doc = await Modal.findByIdAndDelete(req.params.id);
    // const doc = await Modal.deleteMany();

    if (!doc) return next(new AppError('No document found with that ID', 404));

    res.status(204).json({
      code: 204,
      status: 'succes',
      data: null,
    });
  });

module.exports = factory;
