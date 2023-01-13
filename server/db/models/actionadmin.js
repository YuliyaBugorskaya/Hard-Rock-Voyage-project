const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class actionAdmin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Action }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.belongsTo(Action, {
        foreignKey: 'actionId',
      });
    }
  }
  actionAdmin.init({
    action_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'actionAdmin',
  });
  return actionAdmin;
};
