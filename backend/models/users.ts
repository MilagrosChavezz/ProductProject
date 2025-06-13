import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName?: string;
  public lastName?: string;
  public address?: string;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: "email",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "email",
          unique: true,
          using: "BTREE",
          fields: [{ name: "email" }],
        },
      ],
    }
  );

  return User;
};
