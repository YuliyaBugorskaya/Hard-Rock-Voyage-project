/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Actions', [
      {
        title: 'Поездка на Кавказ',
        description: 'Собираемся всей компанией на Кавказ',
        fulldescription: 'Приглашаем всех любителей мототуров с нами на Кавказ',
        startDate: '01.01.2023',
        finishDate: '08.08.2023',
        startPoint: 'Архыз',
        finishPoint: 'Кисловодск',
        mapStart: '127912',
        mapFinish: '127790',
        image: 'https://tripplanet.ru/wp-content/uploads/europe/russia/north-caucasus/dostoprimechatelnosti-severnogo-kavkaza.jpg',
        userId: 7,
        statusId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
