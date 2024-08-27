const { getAll, create, remove } = require('../controllers/category.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/VerifyJWT');
const routerCategory = express.Router();

routerCategory.route('/')
  .get(getAll)
  .post(verifyJwt, create); //blocked

routerCategory.route('/:id')
  .delete(verifyJwt, remove) //blocked

module.exports = routerCategory;