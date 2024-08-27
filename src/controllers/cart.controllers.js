const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async (req, res) => {
  const userId = req.user.id
  const results = await Cart.findAll({
    where: { userId },
    include: [
      {
        model: Product,
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [
          {
            model: Category,
            attributes: ['name', 'id']
          }
        ]
      }
    ]
  });
  return res.json(results)
});

// const create = catchError(async (req, res) => {
//   const userId = req.user.id
//   const result = await Cart.create({...req.body, userId});
//   return res.status(201).json(result);
// });

const create = catchError(async (req, res) => {
  const userId = req.user.id
  const { productId, quantity } = req.body
  const body = { productId, quantity, userId }
  const result = await Cart.create(body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const userId = req.user.id
  const { id } = req.params;
  const result = await Cart.findByPk(id, {
    where: { userId },
    include: [
      {
        model: Product,
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [
          {
            model: Category,
            attributes: ['name', 'id']
          }]
      }]
  });
  if (!result) return res.sendStatus(404);
  return res.json(result)
});

const remove = catchError(async (req, res) => {
  const userId = req.user.id
  const { id } = req.params;
  const result = await Cart.destroy({ where: { id, userId } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204)
});

const update = catchError(async (req, res) => {
  const userId = req.user.id
  const { id } = req.params;
  const { quantity } = req.body
  const result = await Cart.update(
    { quantity },
    { where: { id, userId }, returning: true }
);

  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update
}