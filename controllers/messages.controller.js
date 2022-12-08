const Message = require("../models/message");

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
        const message = new Message();
        const response_data = await message.createMessage(this.#req.body, this.#req.session);
        
        this.#res.send(JSON.stringify(response_data));
    }

    getMessages = async () => {
        const message = new Message();
        const response_data = await message.getMessages(this.#req.session);
        
        this.#res.send(JSON.stringify(response_data));
    }

    destroy = async () => {
        const message = new Message();
        await message.deleteMessage(this.#req.body);

        this.#res.redirect("/");
    }
}

module.exports = MessagesController;