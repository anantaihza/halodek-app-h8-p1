class ControllerUser {
  static async renderUser(req, res) {
    try {
      res.render("./user/user");
    } catch (error) {
      res.send(error);
    }
  }

  static async renderCheckup(req, res) {
    try {
      res.render("./user/checkup");
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

  static async renderDetail(req, res) {
    try {
      res.render("./user/detail-record");
    } catch (error) {
      res.send(error);
    }
  }
  
  
}

module.exports = ControllerUser;