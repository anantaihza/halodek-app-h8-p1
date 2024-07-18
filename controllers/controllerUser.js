const { Op } = require("sequelize");
const { Symptom, Record, RecordSymptom, Disease, Drug, Profile, User } = require("../models/index")
const formatDate = require("../helpers/formatDate");
// const formatCurrency = require("../helpers/formatCurrency");

class ControllerUser {
  static async renderUser(req, res) {
    try {
      if (req.session.user.role !== "User") {
        return res.redirect("/admin")
      }
      const records = await Record.getRecords()
      const user = await User.findByPk(req.session.user.id)
      // res.send(user)
      
      res.render("./user/user", { records, user });
    } catch (error) {
      res.send(error);
    }
  }

  static async renderCheckup(req, res) {
    try {
      if (req.session.user.role !== "User") {
        return res.redirect("/admin")
      }
      const symptoms = await Symptom.findAll();
      const user = await User.findByPk(req.session.user.id)
      res.render("./user/checkup", { symptoms, user });
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

      if (tmp) {
        await Record.update({
          name: tmp.name
        }, {
          where: {
            id: {
              [Op.eq]: record.id
            }
          }
        });
      } else {
        await Record.update({
          name: "Penyakit Tidak Ditemukan"
        }, {
          where: {
            id: {
              [Op.eq]: record.id
            }
          }
        });
      }

      

      res.redirect("/user")

    } catch (error) {
      res.send(error);
    }
  }

  static async renderProfile(req, res) {
    try {
      if (req.session.user.role !== "User") {
        return res.redirect("/admin")
      }
      const profile = await Profile.findOne({
        where: {
          UserId: {
            [Op.eq]: req.session.user.id
          }
        }
      })
      const user = await User.findByPk(req.session.user.id)
      
      res.render("./user/profile", { profile, user });
    } catch (error) {
      res.send(error);
    }
  }
  static async handlerProfile(req, res) {
    try {
      const data = req.body
      await Profile.update(data, {
        where: {
          UserId: {
            [Op.eq]: req.session.user.id
          }
        }
      })
      res.redirect("/user")
    } catch (error) {
      res.send(error);
    }
  }

  static async renderDetail(req, res) {
    try {
      if (req.session.user.role !== "User") {
        return res.redirect("/admin")
      }
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
      const user = await User.findByPk(req.session.user.id)

      // res.send(record)
      res.render("./user/detail-record", { record, disease, formatDate, user });
    } catch (error) {
      res.send(error);
    }
  }
  
  
}

module.exports = ControllerUser;