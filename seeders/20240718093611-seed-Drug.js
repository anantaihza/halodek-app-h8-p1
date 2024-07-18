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
   let drugs = [
    {
      name: "Intunal F 10 Tablet",
      category: "Obat Bebas",
      price: 20000,
      DiseaseId: 1
    },
    {
      name: "Nalgestan 4 Tablet",
      category: "Obat Bebas",
      price: 15000,
      DiseaseId: 1
    },
    {
      name: "Fu Fang E Jiao Jiang 20 ml",
      category: "Obat Bebas",
      price: 30000,
      DiseaseId: 2
    },
    {
      name: "Formening",
      category: "Obat Resep Dokter",
      price: 30000,
      DiseaseId: 3
    },
    {
      name: "Astharol Sirup 60 ml",
      category: "Obat Bebas",
      price: 10000,
      DiseaseId: 4
    },
    {
      name: "Capecitabine",
      category: "Obat Resep Dokter",
      price: 100000,
      DiseaseId: 5
    },
   ];

   drugs = drugs.map(data => {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return data;
   });

   await queryInterface.bulkInsert("Drugs", drugs, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Drugs', null, {});
  }
};
