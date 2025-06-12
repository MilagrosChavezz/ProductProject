import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
export interface OrderAttributes {
  id: number;
  userId?: number;
  totalPrice?: number;
  status?: string;  
}

export type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId?: number;
  public totalPrice?: number;
  public status?: string;  
}

export default (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {   
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'open',
      },
    },
    {
      sequelize,
      tableName: 'orders',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'userId',
          using: 'BTREE',
          fields: [{ name: 'userId' }],
        },
      ],
    }
  );

  return Order;
};
