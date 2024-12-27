'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('internships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stipend: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      skillsRequired: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      recruiterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'recruiters',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('internships');
  },
};
