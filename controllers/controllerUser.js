const { Op } = require("sequelize");
const { Symptom, Record, RecordSymptom, Disease, Drug } = require("../models/index")
const formatDate = require("../helpers/formatDate");
// const formatCurrency = require("../helpers/formatCurrency");

class ControllerUser {
  static async renderUser(req, res) {
    try {
      const records = await Record.getRecords()
      
      res.render("./user/user", { records });
    } catch (error) {
      res.send(error);
    }
  }

  static async renderCheckup(req, res) {
    try {
      const symptoms = await Symptom.findAll();
      res.render("./user/checkup", { symptoms });
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerCheckup(req, res) {
    try {
      // "SymptomId": [
      //   "1",
      //   "2",
      //   "3"
      // ]

      let { SymptomId } = req.body;

      let record = await Record.create({
        UserId: req.session.user.id
      })


      let datas = SymptomId.map(data => {
        return {
          RecordId: record.id,
          SymptomId: data
        }
      })

      await RecordSymptom.bulkCreate(datas);

      // compare symptoms
      let diseases = await Disease.findAll({
        include: {
          model: Symptom,
          attributes: ['id']
        }
      })

      diseases = diseases.map(data => {
        return {
          name: data.name,
          symptoms: data.Symptoms.map(data => data.id)
        }
      })

      let tmp
      let arraySymptomId = SymptomId.map(data => +data).sort()
      for (let i = 0; i < diseases.length; i++) {
        if (JSON.stringify(arraySymptomId) === JSON.stringify(diseases[i].symptoms.sort())) {
          tmp = diseases[i]
        }
      }

      await Record.update({
        name: tmp.name
      }, {
        where: {
          id: {
            [Op.eq]: record.id
          }
        }
      });

      res.redirect("/user")

    } catch (error) {
      res.send(error);
    }
  }

  static async renderProfile(req, res) {
    try {
      
      res.render("./user/profile");
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerProfile(req, res) {
    try {
      
    } catch (error) {
      res.send(error);
    }
  }

  static async renderDetail(req, res) {
    try {
      const { RecordId } = req.params;
      const record = await Record.findByPk(RecordId);
      const disease = await Disease.findOne({
        include: {
          model: Drug
        },
        where: {
          name: {
            [Op.eq]: record.name
          }
        }
      })

      // res.send(record)
      res.render("./user/detail-record", { record, disease, formatDate });
    } catch (error) {
      res.send(error);
    }
  }
  
  
}

module.exports = ControllerUser;