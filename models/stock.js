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
      // define association here
    }
  }
  stock.init({
    symbol: DataTypes.STRING,
    open: DataTypes.INTEGER,
    high: DataTypes.INTEGER,
    low: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    volume: DataTypes.INTEGER,
    latest_trading_day: DataTypes.INTEGER,
    previous_close: DataTypes.INTEGER,
    change: DataTypes.INTEGER,
    change_percent: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'stock',
  });
  return stock;
};