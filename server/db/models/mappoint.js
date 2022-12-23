const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MapPoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Action, {
        foreignKey: 'actionId',
      });
      // define association here
    }
  }
  MapPoint.init({
    titlePoint: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.TEXT,
    start: DataTypes.BOOLEAN,
    actionId: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'MapPoint',
  });
  return MapPoint;
};
