'use strict';
const { Model, Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Task.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          not: /^$/,
        },
      },
      deadline: {
        type: DataTypes.DATEONLY,
        validate: {
          isAfter: new Date(
            new Date().setDate(new Date().getDate() - 15)
          ).toISOString(),
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      underscored: true,
    }
  );
  return Task;
};
