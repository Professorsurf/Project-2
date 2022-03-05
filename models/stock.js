'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.stock.belongsToMany(models.user, {through: "fave"})

    }
  }
  stock.init({
    symbol: DataTypes.STRING,
    open: DataTypes.FLOAT,
    high: DataTypes.FLOAT,
    low: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    volume: DataTypes.FLOAT,
    latest_trading_day: DataTypes.FLOAT,
    previous_close: DataTypes.FLOAT,
    change: DataTypes.FLOAT,
    change_percent: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'stock',
  });
  return stock;
};