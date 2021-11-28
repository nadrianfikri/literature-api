'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Literature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Literature.belongsTo(models.User, {
        as: 'profile',
        foreignKey: {
          name: 'userId',
        },
      });
    }
  }
  Literature.init(
    {
      title: DataTypes.STRING,
      publication_date: DataTypes.DATE,
      pages: DataTypes.INTEGER,
      ISBN: DataTypes.INTEGER,
      author: DataTypes.STRING,
      attach: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      status: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Literature',
    }
  );
  return Literature;
};
