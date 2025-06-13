import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface ProductAttributes {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
}

type ProductCreationAttributes = Optional<ProductAttributes, "id">;

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name?: string;
  public description?: string;
  public price?: number;
  public imageUrl?: string;
  public category?: string;
}

export default (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  return Product;
};
