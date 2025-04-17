const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/get_user_info', verifyToken, userController.getUserInfo);
router.post('/update_user', verifyToken, userController.updateUser);

module.exports = router;
