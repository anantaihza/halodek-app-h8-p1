'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let profiles = [
      {
        firstName: "Admin1",
        lastName: "Yami",
        gender: "Male",
        phoneNumber:"0813222222222",
        birthDate: "2000-12-23T00:00:00.000Z",
        UserId: 1
      },
      {
        firstName: "user1",
        lastName: "aja",
        gender: "Male",
        phoneNumber:"081333333333",
        birthDate: "2000-12-23T00:00:00.000Z",
        UserId: 2
      },
    ];

    profiles = profiles.map(data => {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return data;
    });

    await queryInterface.bulkInsert("Profiles", profiles, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Profiles", null, {})
  }
};
