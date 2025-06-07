import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface ProductOrderAttributes {
  id: number;
  productId?: number;
  orderId?: number;
}

type ProductOrderCreationAttributes = Optional<ProductOrderAttributes, 'id'>;

export default module.exports = (sequelize: Sequelize) => {
  class ProductOrder extends Model<ProductOrderAttributes, ProductOrderCreationAttributes>
    implements ProductOrderAttributes {
    public id!: number;
    public productId?: number;
    public orderId?: number;
  }

  ProductOrder.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'product_order',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'orderId',
          using: 'BTREE',
          fields: [{ name: 'orderId' }],
        },
        {
          name: 'productId',
          using: 'BTREE',
          fields: [{ name: 'productId' }],
        },
      ],
    }
  );

  return ProductOrder;
};
