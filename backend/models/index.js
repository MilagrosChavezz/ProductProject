const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Product = require('./products')(sequelize, Sequelize.DataTypes);
db.Order = require('./orders')(sequelize, Sequelize.DataTypes);
db.User = require('./users')(sequelize, Sequelize.DataTypes);
db.ProductOrder = require('./product_order')(sequelize, Sequelize.DataTypes);


db.Product.belongsToMany(db.Order, {
  through: db.ProductOrder,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders'
});

db.Order.belongsToMany(db.Product, {
  through: db.ProductOrder,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products'
});
module.exports = db;
