/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Actions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      fulldescription: {
        type: Sequelize.TEXT,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      finishDate: {
        type: Sequelize.STRING,
      },
      startPoint: {
        type: Sequelize.STRING,
      },
      finishPoint: {
        type: Sequelize.STRING,
      },
      mapStart: {
        type: Sequelize.STRING,
      },
      mapFinish: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Statuses',
          },
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Actions');
  },
};
