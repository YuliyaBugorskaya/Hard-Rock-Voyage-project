const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Anket, {
        foreignKey: 'statusId',
      });
      this.hasMany(models.Notification, {
        foreignKey: 'statusId',
      });
      // define association here
    }
  }
  Status.init({
    value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};
