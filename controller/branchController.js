const Branch = require('./../model/branchModel');
const Payment = require('./../model/paymentModel');
const Ledger = require('./../model/ledgerModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const handleFactory = require('./../controller/handleFactory');
const branch = require('./../model/branchModel');

// Creating new branch
exports.createBranch = handleFactory.createOne(Branch);
exports.getAllBranchs = handleFactory.getAll(Branch);
exports.getBranch = handleFactory.getOne(Branch);
exports.deleteBranch = handleFactory.deleteOne(Branch);
exports.updateBranch = handleFactory.updateOne(Branch);

exports.getBranchReport = catchAsync(async (req, res, next) => {
  if (!req.body) return next(new AppError('There is no query', 404));

  const { branchId, from, to } = req.body;
  console.log(branchId, from, to);
  const ledger = await Ledger.find();
  console.log(ledger);

  const pay = [];

  ledger.map(async (el) => {
    let data = await handleFactory.getPaymentinfo(
      Payment,
      branchId,
      el.id,
      from,
      to
    );

    pay.push(data);
  });

  res.status(200).json({
    status: 'success',
    result: pay.length,
    data: pay,
  });
});

// const payments = [];
// ledgers
//   .map(async (el) => {
//     const data = await handleFactory.getPaymentinfo(
//       Payment,
//       req.params.branchId,
//       el.id
//     );
//     payments.push(data);
//   })
//   .filter((el) => !el == 0);
