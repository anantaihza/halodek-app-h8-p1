const { Op } = require("sequelize");
const { Drug, Disease, Profile, User } = require("../models/index");

class ControllerUser {
  static async renderAdmin(req, res) {
    try {
      if (req.session.user.role !== "Admin") {
        return res.redirect("/user")
      }
      const { deleteName, search } = req.query;
      let option = {
        include: {
          model: Disease
        }
      }

      if (search) {
        option.where = {
          name: {
            [Op.iLike]: `%${search}%`
          }
        }
      }

      const drugs = await Drug.findAll(option);

      let diseases = await Disease.findAll({
        include: {
          model: Drug
        }
      });

      let labels = []
      let values = []
      for (let i = 0; i < diseases.length; i++) {
        labels.push(diseases[i].name)
        values.push(diseases[i].Drugs.length)
      }
      const user = await User.findByPk(req.session.user.id)

      res.render("./admin/admin", { drugs, deleteName, labels, values, user });
    } catch (error) {
      console.log(error)
      res.send(error);
    }
  }

  static async renderAddDrug(req, res) {
    try {
      if (req.session.user.role !== "Admin") {
        return res.redirect("/user")
      }
      const diseases = await Disease.findAll()
      const user = await User.findByPk(req.session.user.id)
      res.render("./admin/add-drug", { diseases, user })
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

  static async renderProfile(req, res) {
    try {
      if (req.session.user.role !== "Admin") {
        return res.redirect("/user")
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
      res.redirect("/admin")
    } catch (error) {
      res.send(error);
    }
  }

  static async renderEditDrug(req, res) {
    try {
      if (req.session.user.role !== "Admin") {
        return res.redirect("/user")
      }
      const { DrugId } = req.params;
      const drug = await Drug.findByPk(DrugId);
      const diseases = await Disease.findAll(); 
      const user = await User.findByPk(req.session.user.id)
      res.render("./admin/edit-drug", { drug, diseases, user });
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
      if (req.session.user.role !== "Admin") {
        return res.redirect("/user")
      }
      const { DrugId } = req.params;

      let { name } = await Drug.findByPk(DrugId);

      await Drug.destroy({
        where: {
          id: {
            [Op.eq]: DrugId
          }
        }
      });

      res.redirect(`/admin?deleteName=${name}`);
    } catch (error) {
      res.send(error);
    }
  }

}

module.exports = ControllerUser;