const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/VerifyJWT');
const routerProduct = express.Router();

routerProduct.route('/')
  .get(getAll)
  .post(verifyJwt, create); //blocked

routerProduct.route('/:id')
  .get(getOne)
  .delete(verifyJwt, remove) //blocked
  .put(verifyJwt, update); //blocked

module.exports = routerProduct;