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
        title: 'Поездка в Дагестан',
        description: 'Увлекательное путешествие по горам в Дагестане',
        fulldescription: 'Отправимся в горную часть республики, где увидим грандиозный Сулакский каньон, колоритные национальные села и древние крепости',
        startDate: '05.02.2023',
        finishDate: '11.02.2023',
        startPoint: 'Дербент',
        finishPoint: 'Аул Чох',
        mapStart: '12756789912',
        mapFinish: '3456789',
        image: 'https://www.russiadiscovery.ru/upload/files/ecotur-v-dagestan-2_1663075721.jpg',
        userId: 7,
        statusId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
