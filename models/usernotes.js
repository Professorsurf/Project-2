'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userNotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userNotes.init({
    stockId: DataTypes.INTEGER,
    notesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userNotes',
  });
  return userNotes;
};