const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Anket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsTo(models.Action, {
        foreignKey: 'actionId',
      });
      this.belongsTo(models.Status, {
        foreignKey: 'statusId',
      });
      this.hasMany(models.Notification, {
        foreignKey: 'anketId',
      });
      // define association here
    }
  }
  Anket.init({
    message: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    actionId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Anket',
  });
  return Anket;
};
