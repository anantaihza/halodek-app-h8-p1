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
    let diseases = [
      {
        "name": "Flu",
        "description": "Flu adalah infeksi virus yang menyerang sistem pernapasan, termasuk hidung, tenggorokan, dan paru-paru.",
        "level": "Ringan"
      },
      {
        "name": "Sakit Kepala",
        "description": "Sakit kepala adalah rasa nyeri atau tidak nyaman di area kepala atau leher.",
        "level": "Ringan"
      },
      {
        "name": "Meningitis",
        "description": "Meningitis adalah peradangan pada selaput yang melindungi otak dan sumsum tulang belakang, yang dapat disebabkan oleh infeksi virus, bakteri, atau jamur.",
        "level": "Berat"
      },
      {
        "name": "Asma",
        "description": "Asma adalah penyakit pernapasan kronis yang ditandai dengan peradangan dan penyempitan saluran napas.",
        "level": "Ringan"
      },
      {
        "name": "Kanker",
        "description": "Kanker adalah penyakit di mana sel-sel abnormal membelah tanpa kontrol dan dapat menyerang jaringan terdekat serta menyebar ke bagian lain dari tubuh.",
        "level": "Berat"
      }
    ];
    diseases = diseases.map(data => {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return data;
    });

    await queryInterface.bulkInsert("Diseases", diseases, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Diseases", null, {})
  }
};
