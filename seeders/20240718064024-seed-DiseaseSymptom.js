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
    let diseaseSymptoms = [
      // Flu
      {
        DiseaseId: 1,
        SymptomId: 1
      },
      {
        DiseaseId: 1,
        SymptomId: 2
      },
      {
        DiseaseId: 1,
        SymptomId: 3
      },

      // Sakit Kepala
      {
        DiseaseId: 2,
        SymptomId: 4
      },
      {
        DiseaseId: 2,
        SymptomId: 5
      },
      {
        DiseaseId: 2,
        SymptomId: 6
      },

      // Meningitis
      {
        DiseaseId: 3,
        SymptomId: 7
      },
      {
        DiseaseId: 3,
        SymptomId: 8
      },
      {
        DiseaseId: 3,
        SymptomId: 9
      },

      // Asma
      {
        DiseaseId: 4,
        SymptomId: 10
      },
      {
        DiseaseId: 4,
        SymptomId: 11
      },
      {
        DiseaseId: 4,
        SymptomId: 12
      },

      // Kanker
      {
        DiseaseId: 5,
        SymptomId: 13
      },
      {
        DiseaseId: 5,
        SymptomId: 14
      },
      {
        DiseaseId: 5,
        SymptomId: 15
      },
    ];

    diseaseSymptoms = diseaseSymptoms.map(data => {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return data;
    });

    await queryInterface.bulkInsert("DiseaseSymptoms", diseaseSymptoms, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("DiseaseSymptoms", null, {})
  }
};
