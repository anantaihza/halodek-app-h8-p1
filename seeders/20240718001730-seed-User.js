'use strict';

const bcrypt = require("bcryptjs");

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
   let users = [
    {
      username: "admin123",
      email: "admin123@gmail.com",
      password: "12345",
      role: "Admin"
    },
    {
      username: "user1",
      email: "user1@gmail.com",
      password: "23456",
      role: "User"
    },
   ];

   users = users.map(data => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(data.password, salt);

    data.password = hash;
    
    data.createdAt = new Date()
    data.updatedAt = new Date()
    return data;
   });

   await queryInterface.bulkInsert("Users", users, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
