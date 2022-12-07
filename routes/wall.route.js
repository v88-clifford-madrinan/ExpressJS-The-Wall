const { Router }     = require("express");
const ViewController = require("../controllers/view.controller");
const UsersController = require("../controllers/users.controller");


const WallRoute = Router();

WallRoute.get("/login", (req, res) => { new UsersController(req, res).index(); });
WallRoute.get("/register", (req, res) => { new UsersController(req, res).new(); });
WallRoute.post("/register", (req, res) => { new UsersController(req, res).create(); });

module.exports = WallRoute;