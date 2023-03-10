const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Member, {
        foreignKey: 'actionId',
      });
      this.hasMany(models.Anket, {
        foreignKey: 'actionId',
      });
      this.hasMany(models.Notification, {
        foreignKey: 'actionId',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'actionId',
      });
      this.hasMany(models.MapPoint, {
        foreignKey: 'actionId',
      });
      this.hasMany(models.Rating, {
        foreignKey: 'actionId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      this.belongsTo(models.Status, {
        foreignKey: 'statusId',
      });
      this.hasMany(models.actionAdmin, {
        foreignKey: 'actionId',
      });
    }
  }
  Action.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    fulldescription: DataTypes.TEXT,
    startDate: DataTypes.STRING,
    finishDate: DataTypes.STRING,
    startPoint: DataTypes.STRING,
    finishPoint: DataTypes.STRING,
    image: DataTypes.TEXT,
    coordinates: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};
