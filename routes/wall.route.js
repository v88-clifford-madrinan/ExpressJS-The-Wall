const { Router }     = require("express");
const UsersController = require("../controllers/users.controller");
const MessagesController = require("../controllers/messages.controller");
const CommentsController = require("../controllers/comments.controller");

const WallRoute = Router();

/* ROUTE FOR USER */
WallRoute.get("/login", (req, res) => { new UsersController(req, res).index(); });
WallRoute.get("/register", (req, res) => { new UsersController(req, res).new(); });
WallRoute.post("/register", (req, res) => { new UsersController(req, res).create(); });
WallRoute.post("/login", (req, res) => { new UsersController(req, res).login(); });
WallRoute.get("/logout", (req, res) => { new UsersController(req, res).logout(); });

/* ROUTE FOR MESSAGES */
WallRoute.get("/", (req, res) => { new MessagesController(req, res).index(); });
WallRoute.post("/messages", (req, res) => { new MessagesController(req, res).create(); });
WallRoute.get("/get-messages", (req, res) => { new MessagesController(req, res).getMessages(); });
WallRoute.post("/messages/delete", (req, res) => { new MessagesController(req, res).destroy(); })

/* ROUTE FOR COMMENTS */
WallRoute.post("/comments", (req, res) => { new CommentsController(req, res).create(); });

module.exports = WallRoute;