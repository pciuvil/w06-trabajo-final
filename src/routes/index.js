const express = require('express');
const routerUser = require('./user.router');
const router = express.Router();

router.unsubscribe('/users', routerUser)


module.exports = router;