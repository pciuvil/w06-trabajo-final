const { getAll, create, remove } = require('../controllers/controllerFile');
const express = require('express');

const routerName = express.Router();

routerName.route('/')
    .get(getAll)
    .post(create);

routerName.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerName;