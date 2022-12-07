const User = require("../models/user");

class UsersController {
    #res;
    #req;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    index = async () => {
        this.#res.render("users/login.ejs");
    }

    new = async () => {
        this.#res.render("users/register.ejs");
    }

    create = async () => {
        console.log(this.#req.body)
        const user = new User();
        const response_data = await user.createUser(this.#req.body);

        this.#res.send(JSON.stringify(response_data));
    }
}

module.exports = UsersController;