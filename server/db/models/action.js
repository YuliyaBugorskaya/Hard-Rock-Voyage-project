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

      // define association here
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
    mapStart: DataTypes.STRING,
    mapFinish: DataTypes.STRING,
    image: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};
