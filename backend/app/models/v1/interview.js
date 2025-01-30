'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    static associate(models) {
      Interview.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Interview.belongsTo(models.Recruiter, {
        foreignKey: 'recruiterId',
        as: 'recruiter',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Interview.init(
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notNull: true,
        },
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      mode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['online', 'offline', 'hybrid']],
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'scheduled',
        validate: {
          isIn: [['scheduled', 'completed', 'canceled']],
          notEmpty: true,
        },
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      recruiterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recruiters',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Interview',
      tableName: 'interviews',
    }
  );

  return Interview;
};
