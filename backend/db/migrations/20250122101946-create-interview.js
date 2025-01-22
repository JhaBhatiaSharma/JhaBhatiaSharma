'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('interviews', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      mode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['online', 'offline', 'hybrid']],
          notEmpty: true,
        },
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'scheduled',
        validate: {
          isIn: [['scheduled', 'completed', 'canceled']],
          notEmpty: true,
        },
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('interviews');
  }
};
