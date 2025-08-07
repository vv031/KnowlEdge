const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAdmin = require('../middleware/adminMiddleware.js');

router.post('/login', userController.login);  
router.post('/logout', userController.logout);
router.delete('/:id', isAdmin, userController.deleteUser);
router.get('/', isAdmin, userController.getAllUsers); 
router.get('/:id', userController.getUserDetails); // no admin required here
router.post('/', userController.createUser); // no admin required here
router.put('/:id', userController.updateUser); // no admin required here

module.exports = router;
