const catchError = require('../utils/catchError');
const model = require('../models/model');

const getAll = catchError(async(req, res) => {
    const results = await model.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await model.create(req.body);
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await model.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});



module.exports = {
    getAll,
    create,
    remove
}