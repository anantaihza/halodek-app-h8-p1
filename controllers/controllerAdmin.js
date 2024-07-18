class ControllerUser {
  static async renderAdmin(req, res) {
    try {
      res.render("./admin/admin");
    } catch (error) {
      res.send(error);
    }
  }

  static async renderAddDrug(req, res) {
    try {
      res.render("./admin/add-drug")
    } catch (error) {
      res.send(error);
    }
  }

  static async renderEditDrug(req, res) {
    try {
      res.render("./admin/edit-drug")
    } catch (error) {
      res.send(error);
    }
  }

  static async handlerDeleteDrug(req, res) {
    try {

    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerUser;