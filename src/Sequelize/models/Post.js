const { Model, DataTypes } = require('sequelize');

module.exports = class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        content: DataTypes.TEXT,
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'posts',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}