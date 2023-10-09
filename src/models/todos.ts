import { Model, Sequelize, DataTypes } from 'sequelize';
export default class Todo extends Model {
  public id?: number;
  public todoText!: string;
  public userId?: number;
}
export const TodoMap = (sequelize: Sequelize) => {
    Todo.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        todoText: {
            type: DataTypes.TEXT
        },
        userId:{
            type: DataTypes.INTEGER,
            references:{
                model: "users",
                key: "id"
            }
        }
    }, {
        sequelize,
        tableName: 'todos',
        timestamps: false
    });
}