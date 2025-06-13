import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface ProductOrderAttributes {
  id: number;
  productId: number;  
  orderId: number;    
  quantity: number;   
}

type ProductOrderCreationAttributes = Optional<ProductOrderAttributes, 'id' | 'quantity'>;


 export class ProductOrder extends Model<ProductOrderAttributes, ProductOrderCreationAttributes>
    implements ProductOrderAttributes {
    public id!: number;
    public productId!: number;
    public orderId!: number;
    public quantity!: number;
  }

export default (sequelize: Sequelize) => {
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
        allowNull: false, 
        references: {
          model: 'products',
          key: 'id',
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
          model: 'orders',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
          name: 'unique_order_product',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'orderId' }, { name: 'productId' }],
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

