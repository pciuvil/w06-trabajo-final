const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const { verifyJwt } = require('../utils/verifyjtw');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const router = express.Router();

//put the routes here
router.use('/users', routerUser)
router.use("/categories", routerCategory)
router.use('/products', routerProduct)
router.use('/cart', verifyJwt, routerCart) //blocked
router.use('/purchase', verifyJwt, routerPurchase) //blocked
router.use('')
module.exports = router;