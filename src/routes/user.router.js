const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const { verifyJwt } = require('../utils/VerifyJWT');

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create);

routerUser.route('/login')
    .post(login)

routerUser.route('/:id')
    .delete(remove)
    .put(update);

module.exports = routerUser;