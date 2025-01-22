'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Internship extends Model {
    static associate(models) {
      Internship.belongsTo(models.Recruiter, {
        foreignKey: 'recruiterId',
        as: 'recruiter',
      });
    }
  }

  Internship.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      recruiterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'recruiters',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Internship',
      tableName: 'internships',
    }
  );

  return Internship;
};
