const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const UserController = require('../controllers/user');

router.post('/signup', UserController.signup);
router.delete('/logout', UserController.logout);
router.post('/login', UserController.login);
router.post('/updateUserLevel',auth, UserController.updateUserLevel);
router.delete('/:id',auth, UserController.deleteUser);
router.put('/:id',auth, UserController.updateUser);
router.get('/',auth, UserController.getAllUsers);
router.get('/:id',auth, UserController.getOneUser);


module.exports = router;
