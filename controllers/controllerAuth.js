const { Op } = require("sequelize");
const { User, Profile } = require("../models/index");
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
      res.render("login");
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
      res.render("register");
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerRegister(req, res) {
    try {
      const { username, email, password, firstName, lastName, gender, phoneNumber, birthDate } = req.body;
      // sementara
      let user = await User.create({ username, email, password });
      // await User.create({ username, email, password });
      
      // sementara
      await Profile.create({
        firstName,
        lastName,
        gender,
        phoneNumber,
        birthDate,
        UserId: user.id
      });
      
      res.redirect("/login");
    } catch (error) {
      res.send(error);
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