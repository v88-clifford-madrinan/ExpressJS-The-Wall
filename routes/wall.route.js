const { Router }     = require("express");
const ViewController = require("../controllers/view.controller");
const UsersController = require("../controllers/users.controller");


const WallRoute = Router();

WallRoute.get("/login", (req, res) => { new UsersController(req, res).index(); });

module.exports = WallRoute;