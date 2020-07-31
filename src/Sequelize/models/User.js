const { Model, DataTypes } = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Post);
  }
}