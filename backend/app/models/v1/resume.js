'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate(models) {
      Resume.belongsTo(models.Student, {
        foreignKey: 'studentId',
        as: 'student',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Resume.init(
    {
      path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Resume',
      tableName: 'resumes',
    }
  );

  return Resume;
};
