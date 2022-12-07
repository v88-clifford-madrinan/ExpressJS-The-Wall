const { response } = require("express");
const Messages = require("../models/messages");

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

    create = async () => {
        const messages = new Messages();
        const response_data = await messages.createMessage(this.#req.body, this.#req.session);
        
        this.#res.send(JSON.stringify(response_data));
    }
}

module.exports = MessagesController;