const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
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
      this.belongsTo(models.Anket, {
        foreignKey: 'anketId',
      });
      // define association here
    }
  }
  Notification.init({
    userIdSend: DataTypes.INTEGER,
    userIdReceive: DataTypes.INTEGER,
    actionId: DataTypes.INTEGER,
    anketId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    viewed: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};
