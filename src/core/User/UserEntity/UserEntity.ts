import { DataTypes, Model } from "sequelize";
import sequelize from "database/sequelize";
import type { IUserModel, IUserModelCreation } from "./UserEntity.interfaces";

const User = sequelize.define<Model<IUserModel, IUserModelCreation>>("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  takedBooks: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  listEditors: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  // profile: { type: UserProfile },
});

export { User };
