const { Router }     = require("express");
const UsersController = require("../controllers/users.controller");


const WallRoute = Router();

/* ROUTE FOR USER */
WallRoute.get("/login", (req, res) => { new UsersController(req, res).index(); });
WallRoute.get("/register", (req, res) => { new UsersController(req, res).new(); });
WallRoute.post("/register", (req, res) => { new UsersController(req, res).create(); });
WallRoute.post("/login", (req, res) => { new UsersController(req, res).login(); });

module.exports = WallRoute;