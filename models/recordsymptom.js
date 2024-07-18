'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  RecordSymptom.init({
    RecordId: DataTypes.INTEGER,
    SymptomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecordSymptom',
  });
  return RecordSymptom;
};