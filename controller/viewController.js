const Ledger = require('./../model/ledgerModel');
const Purchase = require('./../model/purchaseModel');
const Payment = require('./../model/paymentModel');
const Branch = require('./../model/branchModel');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const handleFactory = require('./../controller/handleFactory');

exports.getOverview = (req, res, next) => {
  res.status(200).render('overview', {
    title: 'Overview',
  });
};

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Sign In',
  });
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render('signUp', {
    title: 'Sign Up',
  });
};

exports.searchBranch = catchAsync(async (req, res, next) => {
  // 1) Getting All Branch information for Render Branch select option
  const branchs = await Branch.aggregate([
    {
      $project: {
        branchName: '$name',
      },
    },
  ]);

  if (!branchs) return next(new AppError('Sorry we dont find data', 404));

  // 2) Sending data to fontend
  res.status(200).render('allBranch', {
    title: 'Find branch info',
    branchs,
  });
});

exports.branchSearchResult = catchAsync(async (req, res, next) => {
  
});
