import { Model, DataTypes } from 'sequelize';
import schema from '../schema/users';

export default class Users extends Model {
  static init(sequelize) {
    return super.init(
        {
          ...schema(DataTypes),
        },
        {
          sequelize,
          timestamps: true,
          freezeTableName: true,
        }
    );
  }

  static associate(models) {
  }
}
