const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
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
      // define association here
    }
  }
  Rating.init({
    likes: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    actionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
