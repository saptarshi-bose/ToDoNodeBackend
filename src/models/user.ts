import { Model, Sequelize, DataTypes } from 'sequelize';
import Todo from './todos';
export default class User extends Model {
    public id?: number;
    public username!: string;
    public password!: string;
  }
export const UserMap = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        tableName: 'users',
        timestamps: false
    });
}