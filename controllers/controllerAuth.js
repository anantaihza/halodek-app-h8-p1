const { Op } = require("sequelize");
const { User, Profile, sequelize } = require("../models/index");
const bcrypt = require("bcryptjs")

class ControllerAuth {
  static async landing(req, res) {
    try {
      res.render("landing");
    } catch (error) {
      res.send(error);
    }
  }

  static async login(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerLogin(req, res) {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({
        where: {
          username: {
            [Op.eq] : username
          }
        }
      });
      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (isValidPassword) {
          req.session.user = {
            id: user.id,
            name: user.name,
            role: user.role
          }

          if (user.role === "Admin") {
            return res.redirect("/admin")
          } else {
            return res.redirect("/user")
          }
        } else {
          const error = "Invalid Username/Password"
          return res.redirect(`/login?error=${error}`)
        }
      } else {
        const error = "User not found"
          return res.redirect(`/login?error=${error}`)
      }

    } catch (error) {
      res.send(error);
    }
  }

  static async register(req, res) {
    try {
      const { error } = req.query
      res.render("register", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerRegister(req, res) {
    const { username, email, password, firstName, lastName, gender, phoneNumber, birthDate } = req.body;
    const t = await sequelize.transaction();

    try {
      const userValidation = User.build({ username, email, password });
      const profileValidation = Profile.build({ firstName, lastName, gender, phoneNumber, birthDate });
      await userValidation.validate();
      await profileValidation.validate();

      let user = await User.create({ username, email, password }, { transaction: t });

      await Profile.create({
        firstName,
        lastName,
        gender,
        phoneNumber,
        birthDate,
        UserId: user.id
      }, { transaction: t });

      await t.commit();
      

      res.redirect("/login");
    } catch (error) {

      await t.rollback();

      switch (error.name) {
        case "SequelizeValidationError":
          let err = error.errors.map(data => {
            return data.message;
          });
          // res.send(err)
          res.redirect(`/register?error=${err}`)
          break;
      
        default:
          res.send(error);
          break;
      }
    }
  }
  
  static async handlerLogOut(req, res) {
    try {
      req.session.destroy()

      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerAuth;