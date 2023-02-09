const express = require('express');
const router = express.Router();
const controll = require('../controller/userctrl');
const { middleware, isAdmin } = require('../middleware/authMiddleware');

router.post('/register',controll.createUser)
router.post('/login',controll.loginUserControll)
router.get('/allusers',controll.getAllUsers)
router.get("/:id",middleware,controll.getUser)
router.delete('/:id',controll.deleteUser)
router.put('/update/:id',controll.updateUser)
router.get('/refresh',controll.handleRefreshToken)
module.exports = router;