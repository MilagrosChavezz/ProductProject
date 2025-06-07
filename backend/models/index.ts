import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import ProductModel from './products';
import OrderModel from './orders';
import UserModel from './users';
import ProductOrderModel from './product_order';

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización de modelos
db.Product = ProductModel(sequelize);
db.Order = OrderModel(sequelize);
db.User = UserModel(sequelize);
db.ProductOrder = ProductOrderModel(sequelize);

// Relaciones
db.Product.belongsToMany(db.Order, {
  through: db.ProductOrder,
  foreignKey: 'productId',
  otherKey: 'orderId',
  as: 'orders',
});

db.Order.belongsToMany(db.Product, {
  through: db.ProductOrder,
  foreignKey: 'orderId',
  otherKey: 'productId',
  as: 'products',
});

export default db;
