const { response } = require("express");
const session = require("express-session");
const User = require("../models/user");

class UsersController {
    #res;
    #req;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    index = async () => {
        let errors = this.#req.session.errors;
        let message = this.#req.session.message;

        this.#req.session.errors = null;
        this.#req.session.message = null;

        this.#res.render("users/login.ejs", { errors, message });
    }

    new = async () => {
        let errors = this.#req.session.errors;
        let message = this.#req.session.message;

        this.#req.session.errors = null;
        this.#req.session.message = null;

        this.#res.render("users/register.ejs", { errors, message });
    }

    create = async () => {
        let response_data = { status: false, result: {}, errors: null }
        const user = new User();

        try{
            response_data = await user.createUser(this.#req.body, this.#req.session);
    
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
        }
        catch(error){
            response_data.errors = error;
        }

        this.#res.send(JSON.stringify(response_data));
    }

    login = async () => {
        let response_data = { status: false, result: {}, errors: null }
        const user = new User();

        try{
            response_data = await user.validLoginInput(this.#req.body, this.#req.session);
    
            this.#req.session.errors = response_data.errors;
            this.#req.session.message = response_data.message;
        }
        catch(error){
            response.errors = error;
        }

        this.#res.send(JSON.stringify(response_data));
    }

    logout = async () => {
        this.#req.session.user_id = null;
        this.#res.redirect("/login");
    }
}

module.exports = UsersController;