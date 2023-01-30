const express = require('express');

const branchController = require('./../controller/branchController');
const authController = require('./../controller/authController');

const router = express.Router();

router.use(authController.protect);

// get all branch information
router
  .route('/all')
  .get(
    authController.restrictTo('engineer', 'chief-engineer', 'admin', 'onwer'),
    branchController.getAllBranchs
  );

router.route('/branchReport').get(branchController.getBranchReport);

// create new branch
router
  .route('/newOne')
  .post(
    authController.restrictTo('chief-engineer', 'admin', 'onwer'),
    branchController.createBranch
  );

//find indivisual branch
router
  .route('/:id')
  .get(authController.restrictTo('supervisor'), branchController.getBranch);

// delete branch
router
  .route('/delete/:id')
  .delete(
    authController.restrictTo('chief-engineer', 'admin', 'onwer'),
    branchController.deleteBranch
  );

router
  .route('/update/:id')
  .patch(
    authController.restrictTo('chief-engineer', 'admin', 'onwer'),
    branchController.updateBranch
  );

module.exports = router;
