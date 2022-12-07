class MessagesController {
    #res;
    #req;

    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    index = async () => {
        if(this.#req.session.user_id){
            this.#res.render("messages/index.ejs");
        }
        else {
            this.#res.redirect("/login");
        }
    }
}

module.exports = MessagesController;