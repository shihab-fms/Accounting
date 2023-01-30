const express = require('express');

const authController = require('./../controller/authController');
const viewController = require('./../controller/viewController');
const router = express.Router();

router.use(authController.isLoggedIn);

router.route('/').get(viewController.getOverview);
router.get('/login', viewController.getLoginForm);
router.get('/signup', viewController.getSignupForm);
router.get('/allBranch', viewController.searchBranch);

module.exports = router;
