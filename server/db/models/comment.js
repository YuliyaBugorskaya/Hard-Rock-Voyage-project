const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
  Comment.init({
    titleCom: DataTypes.TEXT,
    text: DataTypes.TEXT,
    image: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    actionId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
