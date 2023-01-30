const Purchase = require('./../model/purchaseModel');
const handleFactory = require('./handleFactory');

exports.createOne = handleFactory.createOne(Purchase);
exports.updateOne = handleFactory.updateOne(Purchase);
exports.getOne = handleFactory.getOne(Purchase);
exports.getAll = handleFactory.getAll(Purchase);
exports.deleteOne = handleFactory.deleteOne(Purchase);

exports.setUpdateBody = (req, _, next) => {
  if (!req.body) return next();

  req.body.items.map((el) => (el.total = el.rate * el.quantity).toFixed(2));

  if (!req.body.summeryAmount)
    req.body.summeryAmount = req.body.items
      .reduce((acc, el) => acc + el.total * 1, 0)
      .toFixed(2);
  next();
};
