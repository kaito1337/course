import { DataTypes, Model } from 'sequelize';
import sequelize from 'database/sequelize'
import { IBookModel, IBookModelCreation } from './BookEntity.interfaces';
import { User } from 'core/User/UserEntity';
const Book = sequelize.define<Model<IBookModel, IBookModelCreation>>("book", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    author: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
});
User.hasMany(Book);
Book.belongsTo(User);
export { Book }