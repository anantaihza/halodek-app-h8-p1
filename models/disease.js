'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.hasMany(models.Drug)
      Disease.belongsToMany(models.Symptom, { through: 'DiseaseSymptoms' });
    }
  }
  Disease.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};