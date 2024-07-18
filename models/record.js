'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.User);
      Record.belongsToMany(models.Symptom, { through: 'RecordSymptoms' });
    }

    static async getRecords() {
      try {
        return await Record.findAll({
          include: {
            model: sequelize.models.Symptom
          }
        });
      } catch (error) {
        throw error;
      }
    }
  }
  Record.init({
    name: {
      type: DataTypes.STRING
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Record',
  });
  return Record;
};