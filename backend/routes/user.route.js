const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get('/', userController.listUser);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.post('/login', userController.login);
router.post('/login-admin', userController.loginAdmin);
router.get('/getUser', auth.authUser, userController.getUser);

router.get('/customer', auth.authAdmin, userController.listAllCustomer);
router.get('/find-user', auth.authAdmin, userController.findUserByName);
router.post('/change-pass', userController.changePass);
router.post('/forgot-password-admin', auth.authAdmin, userController.forgotPasswordAdmin);
router.post('/forgot-password', auth.authUser, userController.forgotPassword);

module.exports = router;
