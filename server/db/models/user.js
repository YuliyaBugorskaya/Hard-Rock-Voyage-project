const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Notification, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Anket, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Member, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Comment, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Rating, {
        foreignKey: 'userId',
      });
      this.hasMany(models.Action, {
        foreignKey: 'userId',
      });

      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    about: DataTypes.TEXT,
    image: DataTypes.TEXT,
    isadmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
