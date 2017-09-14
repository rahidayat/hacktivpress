var express = require('express');
var router = express.Router();
var userController = require ('../controllers/userController')

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/users', userController.getAllUsers);

module.exports = router;
