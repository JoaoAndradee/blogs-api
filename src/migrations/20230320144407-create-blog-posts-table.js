'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blog_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      published: {
        type: Sequelize.DATE,
      },
      updated: {
        type: Sequelize.DATE,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blog_posts');
  }
};

