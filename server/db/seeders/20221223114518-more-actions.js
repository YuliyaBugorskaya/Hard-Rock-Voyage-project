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
        title: 'Алтайский экспресс',
        description: 'Летние каникулы на Алтае на мотоцикле',
        fulldescription: 'Лето на Алтае — это ожившая сказка. Вас ждут неспешные прогулки к прекрасным озерам и водопадам, встреча с лебедями, знакомство с культурой и традициями коренных алтайцев и местной кухней. А также путешествие по знаменитому Чуйскому тракту в окружении цветущих горных вершин.',
        startDate: '24.06.2023',
        finishDate: '06.07.2023',
        startPoint: 'Горно-Атайск',
        finishPoint: 'КислоАскатводск',
        mapStart: '234567890',
        mapFinish: '09876543',
        image: 'https://ratatum.com/wp-content/uploads/2019/04/6-47.jpg',
        userId: 1,
        statusId: 1,
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
