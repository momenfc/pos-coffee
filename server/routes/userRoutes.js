const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.post('/register', authController.register);
router.post('/login', authController.login);
// router.post('/forget-password', authController.forgetPassword);
// router.post('/reset-password', authController.resetPassword);

//? ACTIVE FOR LOGIN USERS
router.use(authController.protect);
router.post('/update-password', authController.updatePassword);
router.get('/me', userController.getMe, userController.getOne);
router.route('/').patch(userController.update).delete(userController.delete);

//? ACTIVE FOR ADMIN ROLE
router.use(authController.restrictTo('admin'));
router.patch('/role-update', userController.roleUpdate);
router.get('/', userController.getAll);
router.post('/', userController.addOne);
router
  .route('/:id')
  .get(userController.getOne)
  .patch(userController.updateOne)
  .delete(userController.deleteOne);

module.exports = router;
