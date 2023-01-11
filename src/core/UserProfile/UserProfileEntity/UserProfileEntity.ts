import { DataTypes, Model } from 'sequelize';
import sequelize from "database/sequelize";
import { IUserProfileModel, IUserProfileModelCreation } from './UserProfileEntity.interfaces';

const UserProfile = sequelize.define<Model<IUserProfileModel, IUserProfileModelCreation>>("userProfile", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
});

export { UserProfile };