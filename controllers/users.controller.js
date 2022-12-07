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
}

module.exports = UsersController;