'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      private: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      col_float: {
        type: Sequelize.FLOAT,
        defaultValue: 222.22,
      },
      col_decimal: {
        type: Sequelize.DECIMAL,
        defaultValue: 22.22,
      },
      col_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      col_enum: {
        type: Sequelize.ENUM('value1','value2'),
        defaultValue: 'value1',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('posts');
  }
};
