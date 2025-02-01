'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {}
  }

  Student.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 15],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Student',
      tableName: 'students',
    }
  );

  return Student;
};
