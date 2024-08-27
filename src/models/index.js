const Cart = require("./Cart")
const Category = require("./Category")
const Product = require("./Product")
const ProductImg = require("./ProductImg")
const Purchase = require("./Purchase")
const User = require("./User")

//Product => CategoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart => UserId
Cart.belongsTo(User)
User.hasMany(Cart)

//Cart => ProductId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Cart => UserId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Cart => ProductId
Purchase.belongsTo(Product)
Product.hasMany(Purchase)

//ProductImg => ProductId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)