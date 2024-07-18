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
      
    } catch (error) {
      res.send(error);
    }
  }
  
  static async handlerRegister(req, res) {
    try {
      
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ControllerAuth;