const { Op } = require("sequelize");
const { Drug, Disease } = require("../models/index");

class ControllerUser {
  static async renderAdmin(req, res) {
    try {
      const drugs = await Drug.findAll({
        include: {
          model: Disease
        }
      });

      // res.send(drugs)
      res.render("./admin/admin", { drugs });
    } catch (error) {
      res.send(error);
    }
  }

  static async renderAddDrug(req, res) {
    try {
      const diseases = await Disease.findAll()
      res.render("./admin/add-drug", { diseases })
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerAddDrug(req, res) {
    try {
      const data = req.body;
      await Drug.create(data);
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  }

  static async renderEditDrug(req, res) {
    try {
      const { DrugId } = req.params;
      const drug = await Drug.findByPk(DrugId);
      const diseases = await Disease.findAll(); 
      res.render("./admin/edit-drug", { drug, diseases });
    } catch (error) {
      res.send(error);
    }
  }
  
  static async handlerEditDrug(req, res) {
    try {
      let { DrugId } = req.params;
      const data = req.body;
      await Drug.update(data, {
        where: {
          id: {
            [Op.eq]: DrugId
          }
        }
      });
      // console.log(data)
      
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerDeleteDrug(req, res) {
    try {
      const { DrugId } = req.params;

      let { name } = await Drug.findByPk(DrugId);

      await Drug.destroy({
        where: {
          id: {
            [Op.eq]: DrugId
          }
        }
      });

      res.redirect(`/admin?delete=${name}`);
    } catch (error) {
      res.send(error);
    }
  }

}

module.exports = ControllerUser;