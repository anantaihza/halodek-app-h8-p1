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
    let symptoms = [
      // Flu
      {
        name: "Demam tinggi (> 38 °C)",
      },
      {
        name: "Pilek",
      },
      {
        name: "Batuk kering",
      },
      
      // Sakit Kepala
      {
        name: "Nyeri kepala sebelah",
      },
      {
        name: "Tegang pada leher atau bahu",
      },
      {
        name: "Mual",
      },

      // Menigitis
      {
        name: "Demam tinggi",
      },
      {
        name: "Muntah berulang",
      },
      {
        name: "Ruam kulit",
      },

      // Asma
      {
        name: "Sesak napas",
      },
      {
        name: "Dada terasa berat",
      },
      {
        name: "Suara napas seperti siulan",
      },

      // Kanker
      {
        name: "Kehilangan berat badan tanpa sebab",
      },
      {
        name: "Nyeri yang tidak kunjung sembuh",
      },
      {
        name: "Pendarahan yang tidak normal",
      }
    ];

    symptoms = symptoms.map(data => {
      data.createdAt = new Date();
      data.updatedAt = new Date();
      return data;
    });

    await queryInterface.bulkInsert("Symptoms", symptoms, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Symptoms", null, {})
  }
};
