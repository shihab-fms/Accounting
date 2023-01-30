const Payment = require('./../model/paymentModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const handleFactory = require('./handleFactory');

exports.setUpdateBody = (req, _, next) => {
  if (!req.body.payment) return next();

  if (!req.body.summeryAmount)
    req.body.summeryAmount = req.body.payment.reduce(
      (acc, el) => acc + el.amount * 1,
      0
    );

  next();
};

const specialQuery = catchAsync(async (doc, query) => {
  // console.log(query);

  // let doc = await Payment.find(query);
  // if (!doc) return next(new AppError('Data not found', 404));

  let ledgerPayment = [],
    indLedgerSum = [];

  doc.map((el) =>
    ledgerPayment.push(
      el.payment.filter((el) => el.ledgerName.id == query.ledgerName)
    )
  );

  ledgerPayment.map((el) =>
    indLedgerSum.push(el.reduce((acc, el) => acc + el.amount, 0))
  );

  const sum = indLedgerSum.reduce((acc, el) => acc + el, 0);
  doc = [];
  const modDoc = {
    branch: query.branch,
    LedgerName: query.ledgerName,
    date: query.date,
    payment: ledgerPayment.map((el) => el[0]).map((el) => el),
    totalAmount: sum,
  };
  doc.push(modDoc);
  // console.log(doc);
  return 'hello';
});

exports.createPayment = handleFactory.createOne(Payment);
exports.updateOnePayment = handleFactory.updateOne(Payment);
exports.getOnePayment = handleFactory.getOne(Payment);
exports.deleteOnePayment = handleFactory.deleteOne(Payment);

// exports.getAllPayment = handleFactory.getAll(Payment);
exports.getAllPayment = catchAsync(async (req, res, next) => {
  let query;
  let doc;
  if (!req.query.ledgerName) doc = await Payment.find(req.query);

  if (req.query.branch && req.query.ledgerName) {
    query = req.query;

    if (Object.keys(req.query).includes('ledgerName'))
      query.payment = {
        $elemMatch: { ledgerName: req.query.ledgerName },
      };

    doc = await Payment.find(query);

    if (!doc) return next(new AppError('Data not found', 404));

    doc = specialQuery(doc, query);
    console.log(doc);
  }

  res.status(200).json({
    status: 'success',
    // result: doc.length,
    data: {
      data: doc,
    },
  });
});
